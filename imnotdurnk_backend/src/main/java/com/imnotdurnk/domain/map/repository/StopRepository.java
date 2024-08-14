package com.imnotdurnk.domain.map.repository;

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
            "SELECT r.route_id, s.stop_id, ST_Y(s.location) AS stop_lat, ST_X(s.location) AS stop_lon, s.stop_name, r.route_short_name, r.route_type, "+
            "ST_Distance_Sphere(point(ST_X(s.location), ST_Y(s.location)), point(:destlon, :destlat)) AS distance, st.departure_time, st.stop_sequence "+
            "FROM station s "+
            "JOIN stop_time st ON s.stop_id = st.stop_id "+
            "JOIN route r ON r.route_id = st.route_id "+
            "WHERE st.route_id IN ( "+
            "SELECT DISTINCT st2.route_id "+
            "FROM stop_time st2 "+
            "JOIN station s2 ON st2.stop_id = s2.stop_id "+
            "WHERE ST_Distance_Sphere(point(ST_X(s2.location), ST_Y(s2.location)), point(:startlon, :startlat)) < 500 "+
            "AND st2.departure_time > :time "+
            ")) "+
            "SELECT DISTINCT f.route_short_name AS route, f.stop_name AS destStop, "+
            "ST_Distance_Sphere(point(ST_X(s.location), ST_Y(s.location)), point(:startlon, :startlat)) AS startDistance, "+
            "f.stop_lat as destLat, f.stop_lon as destLon, s.stop_name AS startStop, f.distance AS distance, "+
            "abs(time(f.departure_time) - time(st.departure_time)) / 60 as duration, "+
            "st.route_id as routeId, st.stop_sequence as seq1, f.stop_sequence as seq2, "+
            "ST_Y(s.location) as startLat, ST_X(s.location) as startLon, f.route_type as type "+
            "FROM findPath f "+
            "JOIN stop_time st ON f.route_id = st.route_id "+
            "JOIN station s ON st.stop_id = s.stop_id "+
            "WHERE ST_Distance_Sphere(point(ST_X(s.location), ST_Y(s.location)), point(:startlon, :startlat)) < 500 "+
            "AND st.stop_sequence < f.stop_sequence "+
            "AND st.departure_time > :time "+
            "ORDER BY f.distance ASC", nativeQuery = true)
    List<MapResult> findStop(@Param("startlat") Double startlat,
                             @Param("startlon") Double startlon,
                             @Param("destlat") Double destlat,
                             @Param("destlon") Double destlon,
                             @Param("time") String time);

    @Query(value = "SELECT s.stop_name, ST_Y(s.location) AS lat, ST_X(s.location) AS lon " +
            "FROM station s " +
            "JOIN stop_time st ON s.stop_id = st.stop_id " +
            "WHERE st.route_id = :routeId " +
            "AND st.stop_sequence BETWEEN :seq1 AND :seq2 " +
            "ORDER BY st.stop_sequence", nativeQuery = true)
    List<RouteResult> findRoute(@Param("seq1") int seq1, @Param("seq2") int seq2, @Param("routeId") String routeId);

    @Query(value = "SELECT DISTINCT s.route_short_name AS route, s.stop_name AS start, s2.stop_name AS end, s.stop_sequence AS seq1, s2.stop_sequence AS seq2, s.route_type AS type, " +
            "ABS(TIME_TO_SEC(TIMEDIFF(s.departure_time, s2.departure_time)) / 60) AS duration, s.route_id AS routeId " +
            "FROM (SELECT s.stop_name, r.route_id, r.route_type, st.stop_sequence, r.route_short_name, st.departure_time " +
            "      FROM station s " +
            "      JOIN stop_time st ON s.stop_id = st.stop_id " +
            "      JOIN route r ON r.route_id = st.route_id " +
            "      WHERE ST_Distance_Sphere(point(ST_X(s.location), ST_Y(s.location)), point(:startlon, :startlat)) < 500 " +
            "      AND st.departure_time > :time) s " +
            "JOIN (SELECT s.stop_name, r.route_id, st.stop_sequence, st.departure_time " +
            "      FROM station s " +
            "      JOIN stop_time st ON s.stop_id = st.stop_id " +
            "      JOIN route r ON r.route_id = st.route_id " +
            "      WHERE ST_Distance_Sphere(point(ST_X(s.location), ST_Y(s.location)), point(:destlon, :destlat)) < 500) s2 " +
            "ON s.route_id = s2.route_id " +
            "WHERE s.stop_sequence < s2.stop_sequence " +
            "ORDER BY duration ASC", nativeQuery = true)
    List<TransitResult> findTransitRoute(@Param("startlat") Double startlat,
                                         @Param("startlon") Double startlon,
                                         @Param("destlat") Double destlat,
                                         @Param("destlon") Double destlon,
                                         @Param("time") String time);
}
