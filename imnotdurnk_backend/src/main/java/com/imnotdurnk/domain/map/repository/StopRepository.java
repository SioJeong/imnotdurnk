package com.imnotdurnk.domain.map.repository;

import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.entity.RouteResult;
import com.imnotdurnk.domain.map.entity.StopEntity;
import com.imnotdurnk.domain.map.entity.TransitResult;
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
            "AND st2.departure_time>:time "+
            ")) "+
            "SELECT DISTINCT f.route_short_name AS route, f.stop_name AS destStop, "+
            "ST_Distance_Sphere(point(s.stop_lon, s.stop_lat), point(:startlon, :startlat)) AS startDistance, "+
            "f.stop_lat as destLat, f.stop_lon as destLon, s.stop_name AS startStop,  f.distance AS distance, "+
            "abs(time(f.departure_time)-time(st.departure_time)) as duration, "+
            "st.route_id as routeId, st.stop_sequence as seq1, f.stop_sequence as seq2, "+
            "s.stop_lat as startLat, s.stop_lon as startLon "+
            "FROM findPath f "+
            "JOIN stop_time st ON f.route_id = st.route_id "+
            "JOIN stop s ON st.stop_id = s.stop_id "+
            "WHERE ST_Distance_Sphere(point(s.stop_lon, s.stop_lat), point(:startlon, :startlat))<500 "+
            "AND st.stop_sequence < f.stop_sequence "+
            "AND st.departure_time>:time "+
            "ORDER BY f.distance asc", nativeQuery = true)
    List<MapResult> findStop(       @Param("startlat") Double startlat,
                                    @Param("startlon") Double startlon,
                                    @Param("destlat") Double destlat,
                                    @Param("destlon") Double destlon,
                                    @Param("time") String time);

    @Query(value="select s.stop_name, s.stop_lat as lat, s.stop_lon as lon " +
            "from stop s " +
            "JOIN stop_time st ON s.stop_id=st.stop_id " +
            "where st.route_id=:routeId " +
            "and st.stop_sequence between :seq1 and :seq2 " +
            "order by stop_sequence", nativeQuery = true)
    List<RouteResult> findRoute(@Param("seq1") int seq1, @Param("seq2") int seq2, @Param("routeId") String routeId);

    @Query(value="select distinct s.route_short_name as route, s.stop_name as start, s2.stop_name as end,  abs(time(s.departure_time)-time(s2.departure_time))/60 as duration " +
            "from (select s.stop_name, r.route_id, st.stop_sequence, r.route_short_name from stop s join stop_time st on s.stop_id=st.stop_id join route r on r.route_id=st.route_id where ST_Distance_Sphere(point(stop_lon, stop_lat), point(:startlon, :startlat)) < 500 and st.departure_time>:time) s " +
            "join (select s.stop_name, r.route_id, st.stop_sequence from stop s join stop_time st on s.stop_id=st.stop_id join route r on r.route_id=st.route_id where ST_Distance_Sphere(point(stop_lon, stop_lat), point(:destlon, :destlat)) < 500) s2 " +
            "on s.route_id=s2.route_id " +
            "where s.stop_sequence<s2.stop_sequence " +
            "order by duration asc", nativeQuery = true)
    List<TransitResult> findTransitRoute(@Param("startlat") Double startlat,
                                         @Param("startlon") Double startlon,
                                         @Param("destlat") Double destlat,
                                         @Param("destlon") Double destlon,
                                         @Param("time") String time);
}
