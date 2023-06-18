package web.mjob.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;


import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;


@Data
public class OglasDto {

    @NotNull
    private Long id;
    private String sadrzaj;
    private String mjesto;

    private String napomena;

    private Timestamp datum;

    private Integer brojLjudi;

    private Timestamp aktivanDo;

    private BigDecimal satnica;

    private Boolean javni;

    private List<Integer> korisnikPrijavljensById;

    private Long posaoTipByPosaoTipId;

    private Long novcanaNaknadaTipByNovcanaNaknadaTipId;

    private Long narucilacByNarucilacId;
}
