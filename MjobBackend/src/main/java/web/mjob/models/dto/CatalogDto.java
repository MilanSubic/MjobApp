package web.mjob.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CatalogDto {
    protected Long id;
    @NotNull
    protected String naziv;
}
