package com.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "qualification", nullable = false)
    private String qualification;

    @Column(name = "joining_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date joiningDate;

    @Column(name = "designation", nullable = false)
    private String designation;

    @Column(name = "salary", nullable = false)
    private Double salary;

    @Column(name = "address", nullable = false, length = 500)
    private String address;

    @Column(name = "gender", nullable = false)
    private String gender;

    // Constructors
    public Employee() {}

    public Employee(String fullName, String qualification, Date joiningDate, String designation, Double salary, String address, String gender) {
        this.fullName = fullName;
        this.qualification = qualification;
        this.joiningDate = joiningDate;
        this.designation = designation;
        this.salary = salary;
        this.address = address;
        this.gender = gender;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public Date getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(Date joiningDate) {
        this.joiningDate = joiningDate;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    // toString
    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", qualification='" + qualification + '\'' +
                ", joiningDate=" + joiningDate +
                ", designation='" + designation + '\'' +
                ", salary=" + salary +
                ", address='" + address + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
