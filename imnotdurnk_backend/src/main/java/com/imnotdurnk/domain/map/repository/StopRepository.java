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

    @Query(value = "WITH findPath AS ( "+
            "SELECT r.route_id, s.stop_id, s.stop_lat, s.stop_lon, s.stop_name, r.route_short_name, "+
            "ST_Distance_Sphere(point(s.stop_lon, s.stop_lat), point(:destlon, :destlat)) AS distance, st.departure_time, st.stop_sequence "+
            "FROM stop s "+
            "JOIN stop_time st ON s.stop_id = st.stop_id "+
            "JOIN route r ON r.route_id = st.route_id "+
            "WHERE st.route_id IN ( "+
            "SELECT DISTINCT st2.route_id "+
            "FROM stop_time st2 "+
            "JOIN stop s2 ON st2.stop_id = s2.stop_id "+
            "WHERE ST_Distance_Sphere(point(s2.stop_lon, s2.stop_lat), point(:startlon, :startlat))<500 "+
            ")) "+
            "SELECT DISTINCT f.route_short_name AS route, f.stop_name AS destStop, "+
            "ST_Distance_Sphere(point(s.stop_lon, s.stop_lat), point(@startlon, @startlat)) AS startDistance, "+
            "f.stop_lat as destLat, f.stop_lon as destLon, s.stop_name AS startStop,  f.distance AS distance, "+
            "abs(time(f.departure_time)-time(st.departure_time)) as duration, "+
            "st.route_id as routeId, st.stop_sequence as seq1, f.stop_sequence as seq2, "+
            "s.stop_lat as startLat, s.stop_lon as startLon "+
            "FROM findPath f "+
            "JOIN stop_time st ON f.route_id = st.route_id "+
            "JOIN stop s ON st.stop_id = s.stop_id "+
            "WHERE ST_Distance_Sphere(point(s.stop_lon, s.stop_lat), point(:startlon, :startlat))<500 "+
            "AND st.stop_sequence < f.stop_sequence "+
            "ORDER BY f.distance asc", nativeQuery = true)
    List<MapResult> findStop(       @Param("startlat") Double startlat,
                                    @Param("startlon") Double startlon,
                                    @Param("destlat") Double destlat,
                                    @Param("destlon") Double destlon);

    @Query(value="select s.stop_name, s.stop_lat as lat, s.stop_lon as lon " +
            "from stop s " +
            "JOIN stop_time st ON s.stop_id=st.stop_id " +
            "where st.route_id=:routeId " +
            "and st.stop_sequence between :seq1 and :seq2 " +
            "order by stop_sequence", nativeQuery = true)
    List<RouteResult> findRoute(@Param("seq1") int seq1, @Param("seq2") int seq2, @Param("routeId") String routeId);
}
