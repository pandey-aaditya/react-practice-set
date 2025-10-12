import { emailRegex } from "../Constants";

export const useEmailValidation = ({
  value,
  separator = ",",
  domain = null,
}) => {
  try {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Please enter an email address",
      };
    }

    const regex = emailRegex;
    const emails = value.split(separator).map((email) => email.trim());
    const invalidEmails = emails.filter((email) => !regex.test(email));

    if (invalidEmails.length > 0) {
      return {
        isValid: false,
        message: `Invalid email(s): ${invalidEmails.join(", ")}`,
      };
    } else {
      if (domain) {
        const domainInvalids = emails.filter((email) => {
          const emailDomain = email.split("@")[1]?.toLowerCase();
          return emailDomain !== domain.toLowerCase();
        });

        if (domainInvalids.length > 0) {
          return {
            isValid: false,
            message: `Email(s) must be from the domain ${domain}: ${domainInvalids.join(
              ", "
            )}`,
          };
        }
      }

      return {
        isValid: true,
        message: "valid",
      };
    }
  } catch (error) {
    return {
      isValid: false,
      message: `An error occurred while validating the email: ${error.message}`,
    };
  }
};
