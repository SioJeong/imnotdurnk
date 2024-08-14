package com.imnotdurnk.domain.map.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.dto.RouteDto;
import com.imnotdurnk.domain.map.dto.TransitDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.entity.RouteResult;
import com.imnotdurnk.domain.map.entity.TransitResult;
import com.imnotdurnk.domain.map.repository.StopRepository;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.TimeUnit;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

@Service
public class MapServiceImpl implements MapService {

    @Autowired
    StopRepository stopRepository;

    @Value("${odsay.apikey}")
    private String odsayApiKey;
    @Autowired
    private RestTemplate restTemplate;

    /**
     * 지정된 지역 내에서 가장 가까운 정류소와 경로 정보를 검색
     *
     * 주어진 위도 및 경도 범위 내에서 가장 가까운 정류소를 찾기 위해
     * 최소 및 최대 위도 및 경도 값을 계산한 다음, 해당 범위 내의 정류소를 검색하고
     * 가장 가까운 정류소를 반환
     *
     * @param destLat 목적지의 위도
     * @param destLon 목적지의 경도
     * @param startLat 현재 위치의 위도
     * @param startLon 현재 위치의 경도
     * @param time 현재 시간
     * @return 가장 가까운 정류소와 경로 정보를 포함하는 MapResult 객체
     */
    public List<MapDto> getStopsAndRoutesInArea(double startLat, double startLon,  double destLat, double destLon, String time) {

        List<MapDto> mapResult = new ArrayList<MapDto>();
        List<MapResult> stop = stopRepository.findStop(startLat, startLon, destLat, destLon, time);
        Set<String> set = new HashSet<String>();
        int cnt=0;
        for(MapResult result : stop){
            if(set.contains(String.valueOf(result.getRoute()))) {
                continue;
            }
            String slon = result.getStartLon().get();
            slon=slon.replace("\r", "");
            String dlon = result.getDestLon().get();
            dlon=dlon.replace("\r", "");
            mapResult.add(new MapDto(result.getDestLat(), Optional.of(dlon),result.getStartStop(),result.getStartDistance(),result.getRoute(),result.getDestStop(),result.getDistance(),result.getDuration(), result.getSeq1(), result.getSeq2(), result.getRouteId(), result.getStartLat(), Optional.of(slon)));
            set.add(String.valueOf(result.getRoute()));
            if(++cnt==4) break;
        }
        return mapResult;
    }


    /**
     * 지정된 지역 내에서 가장 가까운 정류소와 경로 정보를 검색, 택시 요금
     *
     * 주어진 위도 및 경도 범위 내에서 가장 가까운 정류소를 찾기 위해
     * 최소 및 최대 위도 및 경도 값을 계산한 다음, 해당 범위 내의 정류소를 검색하고
     * 가장 가까운 정류소를 반환
     * 비동기로 택시 요금 검색
     *
     * @param destlat 목적지의 위도
     * @param destlon 목적지의 경도
     * @param startlat 현재 위치의 위도
     * @param startlon 현재 위치의 경도
     * @param time 현재 시간
     * @return 가장 가까운 정류소와 경로 정보를 포함하는 MapResult 객체
     */
    public List<MapDto> getStopsAndRoutesInAreaWithTaxi(double destlat, double destlon, double startlat, double startlon, String time) {
        List<Mono<MapDto>> mapDtoList = new ArrayList<>();

        List<MapResult> stop = stopRepository.findStop(startlat, startlon, destlat, destlon, time);
        Set<String> set = new HashSet<String>();
        int cnt=0;
        if (!stop.isEmpty() && !stop.get(0).getRoute().isEmpty()) {
            for (MapResult result : stop) {
                if(set.contains(String.valueOf(result.getRoute()))) {
                    continue;
                }
                if(++cnt==4) break;
                set.add(String.valueOf(result.getRoute()));
                String slon = result.getStartLon().get().replace("\r", "");
                String dlon = result.getDestLon().get().replace("\r", "");
                String dlat = result.getDestLat().get();
                String origin = slon + ", " + startlat;
                String destination = dlon + ", " + dlat;

                // fetchTaxiFare의 결과를 Mono로 받아서 처리
                Mono<Integer> taxiFareMono = fetchTaxiFare(origin, destination);

                // MapDto를 생성하는 부분을 Mono로 감싸기
                mapDtoList.add(taxiFareMono.map(taxiFare -> new MapDto(
                        result.getDestLat(),
                        Optional.of(dlon),
                        result.getStartStop(),
                        result.getStartDistance(),
                        result.getRoute(),
                        result.getDestStop(),
                        result.getDistance(),
                        result.getDuration(),
                        result.getSeq1(),
                        result.getSeq2(),
                        result.getRouteId(),
                        result.getStartLat(),
                        Optional.of(slon),
                        taxiFare.toString()
                )));
            }

            // 모든 Mono를 합쳐서 결과를 처리하고 block()을 사용하여 동기적으로 결과를 가져옴
            List<MapDto> resultList = Mono.zip(mapDtoList, results -> {
                List<MapDto> tempResultList = new ArrayList<>();
                for (Object obj : results) {
                    tempResultList.add((MapDto) obj);
                }
                return tempResultList;
            }).block(); // 결과를 동기적으로 가져옴

            return resultList;
        }
        // 만약 조건이 충족되지 않으면 빈 리스트 반환
        return new ArrayList<>();
    }

    @Override
    public List<RouteDto> getRoutes(String routeId, int seq1, int seq2){
        int min = seq1<=seq2?seq1:seq2;
        int max = seq1>seq2?seq1:seq2;

        List<RouteResult> route = stopRepository.findRoute(min, max, routeId);
        List<RouteDto> routeResult = new ArrayList<>();
        for(RouteResult result : route){
            String lon = result.getLon().get();
            lon=lon.replace("\r", "");
            routeResult.add(new RouteDto(Optional.of(lon),result.getLat(),result.getStopName()));
        }
        return routeResult;
    }

    /**
     * 지정된 출발지와 도착지에 대한 택시 요금을 비동기적으로 가져옴
     *
     * 이 메서드는 카카오 맵 API를 호출하여 주어진 출발지(origin)와 도착지(destination) 간의
     * 택시 요금과 통행료를 계산하여 반환함
     *
     * @param origin 출발지의 좌표
     * @param destination 도착지의 좌표
     * @return Mono<Integer> 택시 요금과 통행료의 합계를 포함하는 Mono 객체.
     *         성공적으로 요금을 가져오면 Integer 값이 반환되며,
     *         오류가 발생하면 Mono.error()를 통해 에러가 전달됩니다.
     *
     * @throws JsonProcessingException JSON 응답을 파싱하는 도중 발생할 수 있는 예외.
     */
    private Mono<Integer> fetchTaxiFare(String origin, String destination) {
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000) // timeout 시간
                .responseTimeout(Duration.ofMillis(5000))
                .doOnConnected(conn ->
                        conn.addHandlerLast(new ReadTimeoutHandler(5000, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(5000, TimeUnit.MILLISECONDS)));

        var webClient = WebClient.builder()
                .baseUrl("https://app.map.kakao.com/route/carset/mobility.json?")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("origin", origin)
                        .queryParam("destination", destination)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(response -> {
                    try {
                        // 응답을 JSON으로 파싱
                        JsonNode jsonResponse = new ObjectMapper().readTree(response);
                        JsonNode firstResult = jsonResponse.path("results").get(0);
                        JsonNode fareNode = firstResult.path("summary").path("fare");
                        int taxiFare = fareNode.path("taxi").asInt();
                        int tollFare = fareNode.path("toll").asInt();
                        return Mono.just(taxiFare+tollFare);
                    } catch (JsonProcessingException e) {
                        return Mono.error(e); // 에러 발생 시 Mono.error 리턴
                    }
                })
                .doOnError(error -> {
                    System.err.println("Error fetching taxi fare: " + error.getMessage());
                });
    }

    @Override
    public JsonNode requestOdsayApi(String depLng, String depLat, String destLng, String destLat) {
        String url = String.format("https://api.odsay.com/v1/api/searchPubTransPathT?SX=%s&SY=%s&EX=%s&EY=%s&apiKey=%s",depLng, depLat, destLng, destLat, odsayApiKey);

        try {
            // Odsay API 호출 및 JsonNode로 반환
            return restTemplate.getForObject(url, JsonNode.class);
        } catch (RestClientException e) {
            throw new RuntimeException("API 호출 중 오류 발생: " + e.getMessage(), e);
        }
    }

    @Override
    public List<List<TransitDto>> getOptimizeRoute(double destlat, double destlon, double startlat, double startlon, String time){
        String url = String.format("https://api.odsay.com/v1/api/searchPubTransPathT?SX=%s&SY=%s&EX=%s&EY=%s&apiKey=%s",startlon, startlat, destlon, destlat, odsayApiKey);

        JsonNode response = restTemplate.getForObject(url, JsonNode.class);
        List<List<TransitDto>> result = new ArrayList<>();
        String curTime = time;
        // Odsay api 호출을 통해 환승 지점을 구한다
        if (response != null && response.has("result")) {
            int cnt=0;
            for(JsonNode path : response.get("result").get("path")){
                result.add(new ArrayList<TransitDto>());
                JsonNode subPath = path.get("subPath");
                for(JsonNode transfer:subPath) {
                    int trafficType = transfer.get("trafficType").asInt();
                    int sectionTime = transfer.get("sectionTime").asInt();

                    // 버스나 지하철일 때
                    if (trafficType == 1 || trafficType == 2) {
                        double slat = transfer.get("startY").asDouble();
                        double slon = transfer.get("startX").asDouble();
                        double dlat = transfer.get("endY").asDouble();
                        double dlon = transfer.get("endX").asDouble();
                        // 시간을 고려했을 때 해당 시작점부터 끝점까지 갈 수 있는 경로가 있는지 DB에서 찾음
                        List<TransitResult> routes = stopRepository.findTransitRoute(slat, slon, dlat, dlon, curTime);
                        if (!routes.isEmpty()) {
                            TransitResult route = routes.get(0);
                            result.get(cnt).add(new TransitDto(route.getRoute(), route.getStart(), route.getEnd(), slat, slon, dlat, dlon, route.getDuration()));
                            sectionTime = route.getDuration();
                        } else {
                            // 경로가 없다면 목적지까지 최대한 가까이 가서 택시 탑승해야 함
                            List<MapResult> stops = stopRepository.findStop(slat, slon, destlat, destlon, curTime);
                            if (!stops.isEmpty()) {
                                MapResult stop = stops.get(0);
                                result.get(cnt).add(new TransitDto(
                                        stop.getRoute().orElse("택시"),
                                        stop.getStartStop().orElse("0"),
                                        stop.getDestStop().orElse("0"),
                                        stop.getStartLat().map(Double::parseDouble).orElse(0.0), // 수정된 부분
                                        stop.getStartLon().map(Double::parseDouble).orElse(0.0), // 수정된 부분
                                        stop.getDestLat().map(Double::parseDouble).orElse(0.0), // 수정된 부분
                                        stop.getDestLon().map(Double::parseDouble).orElse(0.0), // 수정된 부분
                                        stop.getDuration().map(Double::intValue).orElse(0) // 수정된 부분
                                ));
                            }
                            break;
                        }
                    }
                    curTime = addMinutes(curTime, sectionTime+10);
                }
                if(++cnt==4) break;
            }
        }
        return result;
    }

    public String addMinutes(String time, int minutesToAdd) {
        // 시간, 분, 초를 분리
        String[] timeParts = time.split(":");
        int hours = Integer.parseInt(timeParts[0]);
        int minutes = Integer.parseInt(timeParts[1]);
        int seconds = Integer.parseInt(timeParts[2]);

        // 분 추가
        minutes += minutesToAdd;

        // 추가된 분으로 시간과 분 계산
        hours += minutes / 60;  // 전체 분에서 시간으로 변환
        minutes = minutes % 60;  // 남은 분

        // 결과 문자열 형식화 (00:00:00 형식)
        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }
}