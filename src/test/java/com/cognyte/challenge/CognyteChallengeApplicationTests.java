package com.cognyte.challenge;

import com.cognyte.challenge.model.Residence;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = CognyteChallengeApplication.class)
@WebAppConfiguration
@TestPropertySource(
        locations = "classpath:application-integrationtest.properties")
class CognyteChallengeApplicationTests {
    private MockMvc mvc;
    @Autowired
    private WebApplicationContext webApplicationContext;

    private void setUp() {
        mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    private Residence brasovResidence;

    @BeforeEach
    public void init(){
        setUp();
        brasovResidence = new Residence();
        brasovResidence.setZipCode("500244");
        brasovResidence.setNumber(4);
        brasovResidence.setLatitude(45.6588);
        brasovResidence.setLongitude(25.6303);
        brasovResidence.setResidentsNumber(98);
    }
    @Test
    @DisplayName("Check create residence")
    public void createResidence() throws Exception {
        String inputJson = mapToJson(brasovResidence);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post("/residences")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(HttpStatus.CREATED.value(), status);
        String content = mvcResult.getResponse().getContentAsString();
        Residence residence = mapFromJson(content, Residence.class);
        assertEquals("500244", residence.getZipCode());
    }

    private <T> T mapFromJson(String json, Class<T> clazz)
            throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, clazz);
    }
    private String mapToJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }

}
