/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.winjune.wips.manager.system.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.sql.Blob;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Note: "user" is a reserved SQL-99 keyword, so use "users" for table name.
 * This is a special case because usually we don't plus 's' at the end of an
 * entity name.
 * 
 * @author ezhipin
 */
@Entity
@Table(name = "users")
public class User implements Serializable {

	private static final long serialVersionUID = 1587393468781205832L;

	private int id;
	private String firstName;
	private String lastName;
	private int addressId;
	private Blob picture;
	private String email;
	private boolean enabled;
	private boolean accountExpired;
	private boolean credentialsExpired;
	private boolean locked;
	private String username;
	private String password;
	private Date birthday;
	private Timestamp lastUpdate;

	@Id
	@GeneratedValue
	@Column(name = "user_id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "first_name")
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@Column(name = "last_name")
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Column(name = "address_id")
	public int getAddressId() {
		return addressId;
	}

	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}

	@Column(name = "picture")
	public Blob getPicture() {
		return picture;
	}

	public void setPicture(Blob picture) {
		this.picture = picture;
	}

	@Column(name = "email")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "enabled")
	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	@Column(name = "account_expired")
	public boolean isAccountExpired() {
		return accountExpired;
	}

	public void setAccountExpired(boolean expired) {
		this.accountExpired = expired;
	}

	@Column(name = "credentials_expired")
	public boolean isCredentialsExpired() {
		return credentialsExpired;
	}

	public void setCredentialsExpired(boolean expired) {
		this.credentialsExpired = expired;
	}

	@Column(name = "locked")
	public boolean isLocked() {
		return locked;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	@Column(name = "username")
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Column(name = "password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "birthday")
	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	@Column(name = "last_update")
	public Timestamp getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Timestamp lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
}
