package web.mjob.models.dto;


import lombok.Data;

import java.util.List;

@Data
public class DokumentDto {
    private Long id;
    private String naziv;
    private Long velicina;
    private Long dokumentTipId;
    private String sadrzaj;
}
