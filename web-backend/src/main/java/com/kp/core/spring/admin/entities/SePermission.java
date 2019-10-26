package com.kp.core.spring.admin.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.sql.Date;

@Entity
@Table(name = "SE_PERMISSION", schema = "PUBLIC", catalog = "DATABASE")
public class
SePermission implements Serializable {
    private String name;
    private Date createdTime;
    private BigInteger status;
    private SeResource seResourceByResource;
    private SeOperation seOperation;

    @Id
    @Column(name = "NAME", nullable = false, length = 512)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "CREATED_TIME", nullable = true)
    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    @Basic
    @Column(name = "STATUS", nullable = true, precision = 0)
    public BigInteger getStatus() {
        return status;
    }

    public void setStatus(BigInteger status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SePermission that = (SePermission) o;

        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (createdTime != null ? createdTime.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "RESOURCE", referencedColumnName = "NAME")
    public SeResource getSeResourceByResource() {
        return seResourceByResource;
    }

    public void setSeResourceByResource(SeResource seResourceByResource) {
        this.seResourceByResource = seResourceByResource;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "OPERATION", referencedColumnName = "CODE")
    public SeOperation getSeOperation() {
        return seOperation;
    }

    public void setSeOperation(SeOperation seOperation) {
        this.seOperation = seOperation;
    }
}
