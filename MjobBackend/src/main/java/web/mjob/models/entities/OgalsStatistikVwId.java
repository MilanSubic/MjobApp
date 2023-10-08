package web.mjob.models.entities;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class OgalsStatistikVwId implements Serializable {
    private Long oglas_id;
    private String dan;

    public OgalsStatistikVwId(){}

    public OgalsStatistikVwId(Long oglas_id, String dan) {
        this.oglas_id = oglas_id;
        this.dan = dan;
    }

    // equals() and hashCode()
}
