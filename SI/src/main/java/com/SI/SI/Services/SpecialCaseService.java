package com.SI.SI.Services;



import com.SI.SI.Dtos.SpecialCaseDTO;

import java.util.Optional;

// SpecialCaseService.java
public interface SpecialCaseService {
    SpecialCaseDTO createSpecialCase(Long requestId, SpecialCaseDTO specialCaseDTO);
}

