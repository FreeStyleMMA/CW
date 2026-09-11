package com.coffeewriter.coffeeorigin;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoffeeOriginOptionsDTO {

    private List<String> regions;
    private List<String> varieties;
    private List<String> processes;
    private List<String> grades;
}