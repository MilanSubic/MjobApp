package web.mjob.models.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import web.mjob.models.entities.OglasEntity;

import java.util.List;


@Data
public class PosaoTipDto {
    @NotNull
    private Long id;

    private String naziv;


}
