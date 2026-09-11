package com.coffeewriter.roastery;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoasteryDTO {

    private Long id;

    private String name;

    private String location;

    private String discription;
}