package com.cognyte.challenge.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "residence")
public class Residence {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(name = "zip_code")
    private String zipCode;
    private int number;
    private double latitude;
    private double longitude;
    @Column(name = "residents_number")
    private int residentsNumber;

}
