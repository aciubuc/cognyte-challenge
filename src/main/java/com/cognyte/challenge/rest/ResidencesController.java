package com.cognyte.challenge.rest;

import com.cognyte.challenge.model.Residence;
import com.cognyte.challenge.service.ResidenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/residences")
public class ResidencesController {
    private ResidenceService residenceService;

    public ResidencesController(ResidenceService residenceService) {
        this.residenceService = residenceService;
    }
    @GetMapping
    public List<Residence> getResidences() {
        return residenceService.findAll();
    }
    @GetMapping("/{id}")
    public Residence getResidence(@PathVariable Integer id) {
        return residenceService.findById(id);
    }

    @PostMapping
    public ResponseEntity createResidence(@RequestBody Residence residence) throws URISyntaxException {
        Residence existingResidence = residenceService.save(residence);
        return ResponseEntity.created(new URI("/residences/" + existingResidence.getId())).body(existingResidence);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateResidence(@PathVariable Integer id, @RequestBody Residence residence) {
        Residence existingResidence = residenceService.findById(id);
        existingResidence.setZipCode(residence.getZipCode());
        existingResidence.setNumber(residence.getNumber());
        existingResidence.setLatitude(residence.getLatitude());
        existingResidence.setLongitude(residence.getLongitude());
        existingResidence.setResidentsNumber(residence.getResidentsNumber());
        existingResidence = residenceService.save(residence);

        return ResponseEntity.ok(existingResidence);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteResidence(@PathVariable Integer id) {
        residenceService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
