import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditModal from "../modals/EditModal";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

const baseProps = {
  isOpen: true,
  onClose: jest.fn(),
  onSave: jest.fn(),
  endpoint: "/api/test",
};

describe("EditModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Course fields correctly", () => {
    render(
      <EditModal
        {...baseProps}
        entityName="course"
        data={{ id: 1, name: "Math 101", credits: 3, enrollment_limit: 30 }}
        fields={[
          { name: "name", label: "Course Name" },
          { name: "credits", label: "Credits", type: "number" },
          { name: "enrollment_limit", label: "Enrollment Limit", type: "number" },
        ]}
      />
    );

    expect(screen.getByLabelText(/Course Name/i)).toHaveValue("Math 101");
    expect(screen.getByLabelText(/Credits/i)).toHaveValue(3);
  });

  it("renders Student fields correctly", () => {
    render(
      <EditModal
        {...baseProps}
        entityName="student"
        data={{ id: 2, name: "Alex", email: "alex@mail.com", major: "CS" }}
        fields={[
          { name: "name", label: "Name" },
          { name: "email", label: "Email" },
          { name: "major", label: "Major" },
        ]}
      />
    );

    expect(screen.getByLabelText(/Name/i)).toHaveValue("Alex");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("alex@mail.com");
    expect(screen.getByLabelText(/Major/i)).toHaveValue("CS");
  });

  it("renders Enrollment fields correctly", () => {
    render(
      <EditModal
        {...baseProps}
        entityName="enrollment"
        data={{ id: 3, student_id: 1, course_id: 2, grade: "A" }}
        fields={[
          { name: "student_id", label: "Student ID", type: "number" },
          { name: "course_id", label: "Course ID", type: "number" },
          { name: "grade", label: "Grade" },
        ]}
      />
    );

    expect(screen.getByLabelText(/Student ID/i)).toHaveValue(1);
    expect(screen.getByLabelText(/Grade/i)).toHaveValue("A");
  });

});
