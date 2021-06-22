package com.cognyte.challenge.service;

import com.cognyte.challenge.model.Residence;

import java.util.List;

public interface ResidenceService {
    List<Residence> findAll();
    Residence findById(Integer id);
    Residence save(Residence residence);
    void deleteById(Integer id);
}
