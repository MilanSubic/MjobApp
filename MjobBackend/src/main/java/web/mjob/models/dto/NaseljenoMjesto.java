package web.mjob.models.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class NaseljenoMjesto {

    private Long id;
    private String naziv;
}
