package com.SI.SI.Services;


import com.SI.SI.Dtos.RequestDTO;
import com.SI.SI.Dtos.RequestStatusUpdateDTO;
import com.SI.SI.Enums.RequestStatus;

import java.util.List;
import java.util.Optional;

public interface RequestService {
    RequestDTO createRequest(RequestDTO requestDTO);
    List<RequestDTO> getAllRequests();
    RequestDTO updateRequestStatus(Long id, RequestStatusUpdateDTO statusUpdate);
    public RequestDTO findByNumeroPreDemande(String numeroPreDemande);
    RequestDTO findByCin(String cin);
    RequestDTO findById(Long id);
    RequestDTO updateRequest(Long id, RequestDTO requestDTO);

}
