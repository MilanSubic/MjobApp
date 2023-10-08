package web.mjob.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;


@Data
public class OglasStatistikaDto {
    private Long oglas_id;
    private String dan;
    private Long broj_pregleda;

}
