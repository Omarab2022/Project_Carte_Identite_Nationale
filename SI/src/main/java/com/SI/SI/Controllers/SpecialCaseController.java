package com.SI.SI.Controllers;


import com.SI.SI.Dtos.RequestDTO;
import com.SI.SI.Dtos.SpecialCaseDTO;
import com.SI.SI.Entities.Request;
import com.SI.SI.Entities.SpecialCase;
import com.SI.SI.Mappers.RequestMapper;
import com.SI.SI.Repository.RequestRepository;
import com.SI.SI.Services.SpecialCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/special-cases")
@RequiredArgsConstructor
public class SpecialCaseController {


    private final SpecialCaseService specialCaseService;

    @PostMapping("/{requestId}")
    public ResponseEntity<SpecialCaseDTO> addSpecialCaseToRequest(
            @PathVariable Long requestId,
            @RequestBody SpecialCaseDTO specialCaseDTO) {
        SpecialCaseDTO createdSpecialCase = specialCaseService.createSpecialCase(requestId, specialCaseDTO);
        return new ResponseEntity<>(createdSpecialCase, HttpStatus.CREATED);
    }
}
