package com.imnotdurnk.domain.map.repository;

import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.entity.StopEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StopRepository extends JpaRepository<StopEntity, String> {

    @Query(value = "SELECT s.stop_id, s.stop_lat, s.stop_lon, s.stop_name, " +
            "ST_Distance_Sphere(point(s.stop_lon, s.stop_lat), point(:lon, :lat)) AS distance " +
            "FROM stops s " +
            "JOIN stop_times st ON s.stop_id = st.stop_id " +
            "WHERE st.route_id IN (" +
            "SELECT DISTINCT st2.route_id " +
            "FROM stop_times st2 " +
            "JOIN stops s2 ON st2.stop_id = s2.stop_id " +
            "WHERE s2.stop_lat BETWEEN :latMin AND :latMax " +
            "AND s2.stop_lon BETWEEN :lonMin AND :lonMax) " +
            "ORDER BY distance " +
            "LIMIT 1",
            nativeQuery = true)
    List<MapResult> findNearestStop(@Param("lat") Double lat,
                                    @Param("lon") Double lon,
                                    @Param("latMin") Double latMin,
                                    @Param("latMax") Double latMax,
                                    @Param("lonMin") Double lonMin,
                                    @Param("lonMax") Double lonMax);

}
