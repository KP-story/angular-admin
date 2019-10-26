package com.kp.core.spring.admin.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "SE_ROLE")
public class SeRole implements Serializable {
    List<SePermission> permissions;
    private String name;
    private Date createdTime;
    private BigInteger status;
    private String description;

    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(name = "se_role_permission",
            joinColumns = @JoinColumn(name = "role", referencedColumnName = "name"),
            inverseJoinColumns = @JoinColumn(name = "permission", referencedColumnName = "name"))
    public List<SePermission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<SePermission> permissions) {
        this.permissions = permissions;
    }


    public void addPermissions(List<SePermission> permissions) {
        if (getPermissions() != null) {

            this.permissions.addAll(permissions);

        } else {
            this.permissions = new ArrayList<>();
            this.permissions.addAll(permissions);
        }
    }


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

    @Basic
    @Column(name = "DESCRIPTION", nullable = true, length = 512)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SeRole that = (SeRole) o;

        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (createdTime != null ? createdTime.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }
}
