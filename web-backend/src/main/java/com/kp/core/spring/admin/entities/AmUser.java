package com.kp.core.spring.admin.entities;

import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@ToString
@Table(name = "AM_USER")
public class AmUser implements Serializable {
    List<SeRole> seRoleEntities;
    private Integer userId;
    private String address;
    private String authMethod;
    private Integer createdId;
    private Date createdTime;
    private Integer deletedId;
    private String email;
    private BigInteger expireStatus;
    private Integer failureCount;
    private String fax;
    private String fullname;
    private Date lockedDate;
    private String mobile;
    private Integer modifiedId;
    private Date modifiedPassword;
    private String password;
    private String passwordBackup;
    private String phone;
    private Integer priority;
    private Integer rightType;
    private BigInteger status;
    private String username;
    private String document;

    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(name = "se_user_role",
            joinColumns = @JoinColumn(name = "user", referencedColumnName = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "role", referencedColumnName = "name"))
    public List<SeRole> getSeRoleEntities() {
        return seRoleEntities;
    }

    public void setSeRoleEntities(List<SeRole> seRoleEntities) {
        this.seRoleEntities = seRoleEntities;
    }

    public void addSeRoleEntities(SeRole seRoleEntities) {
        if (getSeRoleEntities() == null) {
            this.seRoleEntities = new ArrayList<>();

        }
        this.seRoleEntities.add(seRoleEntities);
    }


    @Id
    @GeneratedValue
    @Column(name = "USER_ID", nullable = false, precision = 0)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "ADDRESS", nullable = true, length = 512)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "AUTH_METHOD", nullable = true, length = 20)
    public String getAuthMethod() {
        return authMethod;
    }

    public void setAuthMethod(String authMethod) {
        this.authMethod = authMethod;
    }

    @Basic
    @Column(name = "CREATED_ID", nullable = true, precision = 0)
    public Integer getCreatedId() {
        return createdId;
    }

    public void setCreatedId(Integer createdId) {
        this.createdId = createdId;
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
    @Column(name = "DELETED_ID", nullable = true, precision = 0)
    public Integer getDeletedId() {
        return deletedId;
    }

    public void setDeletedId(Integer deletedId) {
        this.deletedId = deletedId;
    }

    @Basic
    @Column(name = "EMAIL", nullable = true, length = 50)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "EXPIRE_STATUS", nullable = true, precision = 0)
    public BigInteger getExpireStatus() {
        return expireStatus;
    }

    public void setExpireStatus(BigInteger expireStatus) {
        this.expireStatus = expireStatus;
    }

    @Basic
    @Column(name = "FAILURE_COUNT", nullable = true, precision = 0)
    public Integer getFailureCount() {
        return failureCount;
    }

    public void setFailureCount(Integer failureCount) {
        this.failureCount = failureCount;
    }

    @Basic
    @Column(name = "FAX", nullable = true, length = 15)
    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    @Basic
    @Column(name = "FULL_NAME", nullable = true, length = 100)
    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullName) {
        this.fullname = fullName;
    }

    @Basic
    @Column(name = "LOCKED_DATE", nullable = true)
    public Date getLockedDate() {
        return lockedDate;
    }

    public void setLockedDate(Date lockedDate) {
        this.lockedDate = lockedDate;
    }

    @Basic
    @Column(name = "MOBILE", nullable = true, length = 15)
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Basic
    @Column(name = "MODIFIED_ID", nullable = true, precision = 0)
    public Integer getModifiedId() {
        return modifiedId;
    }

    public void setModifiedId(Integer modifiedId) {
        this.modifiedId = modifiedId;
    }

    @Basic
    @Column(name = "MODIFIED_PASSWORD", nullable = true)
    public Date getModifiedPassword() {
        return modifiedPassword;
    }

    public void setModifiedPassword(Date modifiedPassword) {
        this.modifiedPassword = modifiedPassword;
    }

    @Basic
    @Column(name = "PASSWORD", nullable = true, length = 100)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "PASSWORD_BACKUP", nullable = true, length = 50)
    public String getPasswordBackup() {
        return passwordBackup;
    }

    public void setPasswordBackup(String passwordBackup) {
        this.passwordBackup = passwordBackup;
    }

    @Basic
    @Column(name = "PHONE", nullable = true, length = 15)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "PRIORITY", nullable = true, precision = 0)
    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    @Basic
    @Column(name = "RIGHT_TYPE", nullable = true, precision = 0)
    public Integer getRightType() {
        return rightType;
    }

    public void setRightType(Integer rightType) {
        this.rightType = rightType;
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
    @Column(name = "USER_NAME", nullable = true, length = 50)
    public String getUsername() {
        return username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    @Basic
    @Column(name = "DOCUMENT", nullable = true)
    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AmUser that = (AmUser) o;

        if (userId != that.userId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId;
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (authMethod != null ? authMethod.hashCode() : 0);
        result = 31 * result + (createdId != null ? createdId.hashCode() : 0);
        result = 31 * result + (createdTime != null ? createdTime.hashCode() : 0);
        result = 31 * result + (deletedId != null ? deletedId.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (expireStatus != null ? expireStatus.hashCode() : 0);
        result = 31 * result + (failureCount != null ? failureCount.hashCode() : 0);
        result = 31 * result + (fax != null ? fax.hashCode() : 0);
        result = 31 * result + (fullname != null ? fullname.hashCode() : 0);
        result = 31 * result + (lockedDate != null ? lockedDate.hashCode() : 0);
        result = 31 * result + (mobile != null ? mobile.hashCode() : 0);
        result = 31 * result + (modifiedId != null ? modifiedId.hashCode() : 0);
        result = 31 * result + (modifiedPassword != null ? modifiedPassword.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (passwordBackup != null ? passwordBackup.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (priority != null ? priority.hashCode() : 0);
        result = 31 * result + (rightType != null ? rightType.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (document != null ? document.hashCode() : 0);
        return result;
    }
}
