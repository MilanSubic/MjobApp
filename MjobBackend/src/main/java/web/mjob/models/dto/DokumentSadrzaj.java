package web.mjob.models.dto;

import lombok.Data;

@Data
public class DokumentSadrzaj {
    private Long id;
    private String sadrzaj;
    private String contentType;
    private Long dokumentId;
}
