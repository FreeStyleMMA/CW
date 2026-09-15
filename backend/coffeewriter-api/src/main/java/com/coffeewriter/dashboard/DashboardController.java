package com.coffeewriter.dashboard;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dashboard")
@CrossOrigin(
	    origins = {
	        "http://localhost:3000",
	        "http://localhost:5173",
	        "http://localhost"
	    },
	    allowCredentials = "true"
	)
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/overview")
    public DashboardOverviewResponse getOverview() {

        return dashboardService.getOverview();
    }

    @GetMapping("/recent-records")
    public List<RecentRecipeResponse> getRecentRecords() {

        return dashboardService.getRecentRecords();
    }
}