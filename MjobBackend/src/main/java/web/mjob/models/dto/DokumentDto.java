package web.mjob.models.dto;


import lombok.Data;

import java.util.List;

@Data
public class DokumentDto {
    public String naziv;
    public Long velicina;
    public Long dokumentTipId;
    public String sadrzaj;
}
