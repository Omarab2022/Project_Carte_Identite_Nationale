package com.SI.SI.Services.ServiceImpl;

import com.SI.SI.Dtos.SpecialCaseDTO;
import com.SI.SI.Entities.Request;
import com.SI.SI.Entities.SpecialCase;
import com.SI.SI.Mappers.RequestMapper;
import com.SI.SI.Mappers.SpecialCaseMapper;
import com.SI.SI.Repository.RequestRepository;
import com.SI.SI.Repository.SpecialCaseRepository;
import com.SI.SI.Services.SpecialCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class SpecialCaseServiceImpl implements SpecialCaseService {

    private final RequestRepository requestRepository;
    private final SpecialCaseRepository specialCaseRepository;
    private final SpecialCaseMapper specialCaseMapper;
    private final RequestMapper requestMapper;

    @Override
    public SpecialCaseDTO createSpecialCase(Long requestId, SpecialCaseDTO specialCaseDTO) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));

        SpecialCase specialCase = specialCaseMapper.toEntity(specialCaseDTO);
        specialCase.setRequest(request);
        request.setSpecialCase(specialCase);

        requestRepository.save(request);
        return specialCaseMapper.toDto(specialCase);
    }
}

