/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Note2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "Note2";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Acceso" (
    "access_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Acceso_pkey" PRIMARY KEY ("access_id")
);

-- CreateTable
CREATE TABLE "Rol_acceso" (
    "access_roles_id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "access_id" INTEGER NOT NULL,

    CONSTRAINT "Rol_acceso_pkey" PRIMARY KEY ("access_roles_id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "role_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Rol_usuario" (
    "role_user_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "Rol_usuario_pkey" PRIMARY KEY ("role_user_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Persona" (
    "person_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("person_id")
);

-- CreateTable
CREATE TABLE "Docente" (
    "teacher_id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "Docente_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "Supervisor" (
    "supervisor_id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,

    CONSTRAINT "Supervisor_pkey" PRIMARY KEY ("supervisor_id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "student_id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Proceso" (
    "process_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "supervisor_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Proceso_pkey" PRIMARY KEY ("process_id")
);

-- CreateTable
CREATE TABLE "Evalucion" (
    "assesment_id" SERIAL NOT NULL,
    "proceso_id" INTEGER NOT NULL,
    "assesment_tool_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "is_virtual" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Evalucion_pkey" PRIMARY KEY ("assesment_id")
);

-- CreateTable
CREATE TABLE "Nivel" (
    "level_id" SERIAL NOT NULL,
    "assesment_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "Nivel_pkey" PRIMARY KEY ("level_id")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" SERIAL NOT NULL,
    "dimension_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "Dimension" (
    "dimension_id" SERIAL NOT NULL,
    "assesment_tool_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Dimension_pkey" PRIMARY KEY ("dimension_id")
);

-- CreateTable
CREATE TABLE "Instrumento" (
    "assesment_tool_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Instrumento_pkey" PRIMARY KEY ("assesment_tool_id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "company_id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "Etapa" (
    "step_id" SERIAL NOT NULL,
    "type_id" INTEGER NOT NULL,
    "process_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Etapa_pkey" PRIMARY KEY ("step_id")
);

-- CreateTable
CREATE TABLE "Tipo" (
    "type_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tipo_pkey" PRIMARY KEY ("type_id")
);

-- AddForeignKey
ALTER TABLE "Rol_acceso" ADD CONSTRAINT "Rol_acceso_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Rol"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rol_acceso" ADD CONSTRAINT "Rol_acceso_access_id_fkey" FOREIGN KEY ("access_id") REFERENCES "Acceso"("access_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rol_usuario" ADD CONSTRAINT "Rol_usuario_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rol_usuario" ADD CONSTRAINT "Rol_usuario_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Rol"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Persona"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docente" ADD CONSTRAINT "Docente_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Persona"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supervisor" ADD CONSTRAINT "Supervisor_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Docente"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Persona"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Estudiante"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "Supervisor"("supervisor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Empresa"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evalucion" ADD CONSTRAINT "Evalucion_proceso_id_fkey" FOREIGN KEY ("proceso_id") REFERENCES "Proceso"("process_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evalucion" ADD CONSTRAINT "Evalucion_assesment_tool_id_fkey" FOREIGN KEY ("assesment_tool_id") REFERENCES "Instrumento"("assesment_tool_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nivel" ADD CONSTRAINT "Nivel_assesment_id_fkey" FOREIGN KEY ("assesment_id") REFERENCES "Evalucion"("assesment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nivel" ADD CONSTRAINT "Nivel_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_dimension_id_fkey" FOREIGN KEY ("dimension_id") REFERENCES "Dimension"("dimension_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dimension" ADD CONSTRAINT "Dimension_assesment_tool_id_fkey" FOREIGN KEY ("assesment_tool_id") REFERENCES "Instrumento"("assesment_tool_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etapa" ADD CONSTRAINT "Etapa_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Tipo"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
