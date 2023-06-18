package web.mjob.models.dto;


import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NovcanaNaknadaDto {
    @NotNull
    private Long id;

    private String naziv;


}
