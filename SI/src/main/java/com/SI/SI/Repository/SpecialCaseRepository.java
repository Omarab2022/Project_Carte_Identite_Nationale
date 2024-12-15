package com.SI.SI.Repository;




import com.SI.SI.Entities.SpecialCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialCaseRepository extends JpaRepository<SpecialCase, Long> {

}

