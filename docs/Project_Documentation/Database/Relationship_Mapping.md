# Relationship Mapping

This document specifies the foreign key constraints and cascading behaviors for the relational data models.

## 1. `Universities` to `Users`
- **Relationship:** One-to-Many (1:N)
- **Constraint:** A User (Student or Coordinator) must belong to one University.
- **On Delete:** `RESTRICT`. A university cannot be deleted if active users exist. This prevents accidental deletion of entire student cohorts.

## 2. `Users` to `Resumes`
- **Relationship:** One-to-One (1:1)
- **Constraint:** A student can have at most one active parsed resume at a time. Uploading a new resume overrides the previous JSON data.
- **On Delete:** `CASCADE`. If a student deletes their account, their resume data is immediately purged.

## 3. `Users` to `Interviews`
- **Relationship:** One-to-Many (1:N)
- **Constraint:** A student can conduct multiple mock interviews over time.
- **On Delete:** `CASCADE`. If a student deletes their account, all historical interview records are purged.

## 4. `Interviews` to `Interview_Results`
- **Relationship:** One-to-One (1:1)
- **Constraint:** An interview can only have one final result object (transcript and scores).
- **On Delete:** `CASCADE`. If an interview record is deleted, its heavy JSON results are also purged.
