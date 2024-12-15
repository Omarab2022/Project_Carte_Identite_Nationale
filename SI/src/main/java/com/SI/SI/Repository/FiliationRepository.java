package com.SI.SI.Repository;



import com.SI.SI.Entities.Filiation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FiliationRepository extends JpaRepository<Filiation, Long> {

}
