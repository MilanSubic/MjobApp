package web.mjob.models.entities;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;
import web.mjob.base.BaseEntity;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@IdClass(OgalsStatistikVwId.class)
@Immutable
@Subselect("select oglas_id, DATE_FORMAT(vrijeme, '%d.%m.%Y.') as dan, max(vrijeme) as vrijeme, count(*) as broj_pregleda from oglas_statistika\n" +
        "group by oglas_id, DATE_FORMAT(vrijeme, '%d.%m.%Y.')\n" +
        "order by vrijeme desc")
public class OglasStatistikaVwEntity {

    @Id
    private Long oglas_id;
    @Id
    private String dan;
    private Date vrijeme;
    private Long broj_pregleda;
}


