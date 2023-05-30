package web.mjob.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NaseljenoMjestoDto extends CatalogDto {
    @NotNull
    private Long opstinaId;
    private String opstinaNaziv;
}
