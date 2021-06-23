package com.cognyte.challenge.service;

import com.cognyte.challenge.model.Residence;
import com.cognyte.challenge.dao.ResidenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResidenceServiceImpl implements ResidenceService {
    private ResidenceRepository residenceRepository;
    public ResidenceServiceImpl(ResidenceRepository residenceRepository){
        this.residenceRepository = residenceRepository;
    }
    @Override
    public List<Residence> findAll() {
        return residenceRepository.findAll();
    }

    @Override
    public Residence findById(Integer id) {
        return residenceRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Override
    public Residence save(Residence residence) {
        return residenceRepository.save(residence);
    }

    @Override
    public void deleteById(Integer id) {
        residenceRepository.deleteById(id);
    }
}
