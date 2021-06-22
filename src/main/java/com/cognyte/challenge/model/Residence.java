package com.cognyte.challenge.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "residence")
public class Residence {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(name = "zip_code")
    private String zipCode;
    private int number;
    private double latitude;
    private double longitude;
    @Column(name = "residents_number")
    private int residentsNumber;

}
