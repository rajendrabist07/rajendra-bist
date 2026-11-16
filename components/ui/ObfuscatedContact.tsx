"use client";

import React, { useEffect, useState } from "react";

export function ObfuscatedEmail({
  user = "rajendrabist396",
  domain = "gmail.com",
  className,
}: {
  user?: string;
  domain?: string;
  className?: string;
}) {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  if (!email) {
    return <span className={className} aria-label="Loading contact email">...</span>;
  }

  return (
    <a href={`mailto:${email}`} className={className} aria-label={`Send email to ${email}`}>
      {email}
    </a>
  );
}

export function ObfuscatedPhone({
  countryCode = "+91",
  number = "8700918036",
  className,
}: {
  countryCode?: string;
  number?: string;
  className?: string;
}) {
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    // Format nicely e.g. +91 8700918036
    setPhone(`${countryCode} ${number}`);
  }, [countryCode, number]);

  if (!phone) {
    return <span className={className} aria-label="Loading phone number">...</span>;
  }

  const telHref = `${countryCode}${number}`.replace(/\s+/g, "");

  return (
    <a href={`tel:${telHref}`} className={className} aria-label={`Call ${phone}`}>
      {phone}
    </a>
  );
}
