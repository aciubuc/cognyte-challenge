package com.cognyte.challenge.dao;

import com.cognyte.challenge.model.Residence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResidenceRepository extends JpaRepository<Residence, Integer> {
}
