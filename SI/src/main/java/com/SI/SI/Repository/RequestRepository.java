package com.SI.SI.Repository;



import com.SI.SI.Entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    Optional<Request> findByCnieNumber(String cnieNumber);
    Optional<Request> findByNumeroPreDemande(String numeroPreDemande);


}
