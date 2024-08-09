package com.imnotdurnk.domain.map.repository;

import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.entity.RouteResult;
import com.imnotdurnk.domain.map.entity.StopEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StopRepository extends JpaRepository<StopEntity, String> {

    @Query(value = "WITH findPath AS ( " +
            "SELECT s.stop_id, s.stop_lat, s.stop_lon, s.stop_name, r.route_short_name, r.route_id, " +
            "ST_Distance_Sphere(point(s.stop_lon, s.stop_lat), point(:lon, :lat)) AS distance, st.departure_time, st.stop_sequence " +
            "FROM stop s " +
            "JOIN stop_time st ON s.stop_id = st.stop_id " +
            "JOIN route r ON r.route_id = st.route_id " +
            "WHERE st.departure_time>:time AND st.route_id IN ( " +
            "SELECT DISTINCT st2.route_id " +
            "FROM stop_time st2 " +
            "JOIN stop s2 ON st2.stop_id = s2.stop_id " +
            "WHERE s2.stop_lat BETWEEN :latMin AND :latMax " +
            "AND s2.stop_lon BETWEEN :lonMin AND :lonMax " +
            ")) " +
            "SELECT s.stop_name AS startStop, " +
            "ST_Distance_Sphere(point(s.stop_lon, s.stop_lat), point(:startlon, :startlat)) AS startDistance, " +
            "f.stop_lat as destLat, f.stop_lon as destLon, f.stop_name AS destStop, f.route_short_name AS route, f.distance AS distance, " +
            "abs(time(f.departure_time)-time(st.departure_time)) as duration, "+
            "st.route_id as routeId, st.stop_sequence as seq1, f.stop_sequence as seq2, "+
            "s.stop_lat as startLat, s.stop_lon as startLon "+
            "FROM findPath f " +
            "JOIN stop_time st ON f.route_id = st.route_id " +
            "JOIN stop s ON st.stop_id = s.stop_id " +
            "ORDER BY f.distance, startDistance " +
            "LIMIT 3", nativeQuery = true)
    List<MapResult> findStop(@Param("lat") Double lat,
                                    @Param("lon") Double lon,
                                    @Param("startlat") Double startlat,
                                    @Param("startlon") Double startlon,
                                    @Param("latMin") Double latMin,
                                    @Param("latMax") Double latMax,
                                    @Param("lonMin") Double lonMin,
                                    @Param("lonMax") Double lonMax,
                                    @Param("time") String time);


    @Query(value="select s.stop_name, s.stop_lat as lat, s.stop_lon as lon " +
            "from stop s " +
            "JOIN stop_time st ON s.stop_id=st.stop_id " +
            "where st.route_id=:routeId " +
            "and st.stop_sequence between :seq1 and :seq2 " +
            "order by stop_sequence", nativeQuery = true)
    List<RouteResult> findRoute(@Param("seq1") int seq1, @Param("seq2") int seq2, @Param("routeId") String routeId);
}
