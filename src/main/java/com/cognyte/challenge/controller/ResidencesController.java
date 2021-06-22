package com.cognyte.challenge.controller;

import com.cognyte.challenge.model.Residence;
import com.cognyte.challenge.repository.ResidenceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/residences")
public class ResidencesController {
    private final ResidenceRepository residenceRepository;

    public ResidencesController(ResidenceRepository residenceRepository) {
        this.residenceRepository = residenceRepository;
    }
    @GetMapping
    public List<Residence> getResidences() {
        return residenceRepository.findAll();
    }
    @GetMapping("/{id}")
    public Residence getResidence(@PathVariable Integer id) {
        return residenceRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createResidence(@RequestBody Residence residence) throws URISyntaxException {
        Residence existingResidence = residenceRepository.save(residence);
        return ResponseEntity.created(new URI("/residences/" + existingResidence.getId())).body(existingResidence);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateResidence(@PathVariable Integer id, @RequestBody Residence residence) {
        Residence existingResidence = residenceRepository.findById(id).orElseThrow(RuntimeException::new);
        existingResidence.setZipCode(residence.getZipCode());
        existingResidence.setNumber(residence.getNumber());
        existingResidence.setLatitude(residence.getLatitude());
        existingResidence.setLongitude(residence.getLongitude());
        existingResidence.setResidentsNumber(residence.getResidentsNumber());
        existingResidence = residenceRepository.save(residence);

        return ResponseEntity.ok(existingResidence);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteResidence(@PathVariable Integer id) {
        residenceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
