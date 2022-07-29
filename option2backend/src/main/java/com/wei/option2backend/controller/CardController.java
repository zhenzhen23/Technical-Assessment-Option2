package com.wei.option2backend.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class CardController {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${requestUrl}")
    private String requestUrl;
    @Value("${authkey}")
    private String authkey;

    @RequestMapping(value = "/activecard", method = {RequestMethod.POST, RequestMethod.GET})
    public String activeCard (@RequestBody Object inputData){

        String url = requestUrl;

        // Create request head and set content type and auth key
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authkey", authkey);

        // Convert input(object) to JSONObject
        JSONObject jsonObject1 = JSONObject.parseObject(JSONObject.toJSONString(inputData));

        HttpEntity<JSONObject> entity = new HttpEntity<>(jsonObject1, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        return response.getBody().toString();
    }
}
