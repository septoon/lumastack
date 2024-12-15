import Resume from "../settings/resume.json";

/**
 * Типизация JSON-объекта Resume
 */
interface ResumeBasics {
  basics: {
    name: string;
  };
}

const resume: ResumeBasics = Resume;

const names = resume.basics.name.split(" ");

/**
 * Первое имя (First Name)
 */
export const FirstName: string = names[0];

/**
 * Последнее имя (Last Name)
 */
export const LastName: string = names[names.length - 1];

/**
 * Инициалы (Initials)
 */
export const Initials: string = FirstName.charAt(0)
  .toUpperCase()
  .concat(LastName.charAt(0).toUpperCase());