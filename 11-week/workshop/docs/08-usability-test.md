
# CP8 — Usability Test and Improvements

## 1. Objective

Evaluate the usability of the registration form and
attendance history in Attendance Control.

The evaluation focuses on form validation, role
selection, error messages, and screen navigation.

## 2. Test Setup

- Device: Laptop
- Browser: Microsoft Edge
- Participants: 2
- Tasks: 3 per participant
- Application: Attendance Control

## 3. Test Tasks

1. Complete the registration form with valid sample data.
2. Open an attendance record, review its details,
   and return to the attendance history.
3. Enter an invalid email address and correct it
   after reading the validation message.

## 4. Recorded Results

| Participant | Task | Result | Time | Observation |
|---|---|---|---|---|
| 1 | Registration | Completed | 50 s | Hesitated when choosing between Student and Teacher. |
| 1 | Attendance details | Completed without help | 30 s | No assistance reported; original observation needs confirmation. |
| 1 | Invalid email | Completed | 20 s | Understood the red error message and corrected the email independently. |
| 2 | Registration | Completed with help | 70 s | Assistance was required; the specific difficulty was not recorded. |
| 2 | Attendance details | Completed without help | 50 s | Completed the task without reported difficulties. |
| 2 | Invalid email | Completed with help | 60 s | Did not understand why the email address was invalid. |

## 5. Findings

### Finding 1 — Role Selection

Participant 1 hesitated when choosing between
the Student and Teacher roles.

Improvement opportunity:
Explain what each role allows the user to do.

### Finding 2 — Email Validation

Participant 2 needed help understanding why
the email address was invalid.

Improvement opportunity:
Provide a more specific validation message and
an example of a correctly formatted email address.

### Finding 3 — Attendance Navigation

Both participants were reported to complete the
attendance details task without assistance.

The available observations do not establish a
navigation defect. This is a positive usability result.

## 6. Implemented Improvement

File modified:

`app/src/features/auth/presentation/RegisterPage.tsx`

Changes:

- Added an example email address below the email field.
- Improved the invalid email message by explaining
  that an @ sign and domain are required.
- Added a description of the Student and Teacher roles.
- Updated the role option labels to clarify their purpose.
- Preserved the existing form validation and feedback.

## 7. Technical Verification

The following checks were performed:

- Visual verification of the improved registration screen.
- Visual verification of the invalid email feedback.
- Production build using `npm run build`.
- TypeScript compilation completed without errors.
- Vite successfully processed 240 modules.

The implementation changes added 25 lines and
removed 4 lines from RegisterPage.tsx.

## 8. Evidence

### Improved Email Validation

![Improved email validation](img/after-cp8-email-validation.png)

### Updated Registration Form

![Updated registration form](img/after-cp8-valid-form.png)

## 9. Limitations

- The application still uses a demonstration
  registration flow without creating an actual account.
- The registration assistance needed by Participant 2
  was not described in the recorded notes.
- No follow-up usability test has yet been documented
  to measure whether the improvements reduce errors.
- The original observation for Participant 1's
  attendance task should be clarified.

## 10. Conclusion

The recorded observations identified difficulties
with role selection and email validation.

The registration form was updated to provide clearer
guidance and more actionable feedback.

The changes passed the production build, but their
impact on user performance has not yet been measured
through a repeated usability test.
