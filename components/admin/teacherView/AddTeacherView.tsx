import AddTeacherForm from "./AddTeacherForm";

const AddTeacherView = () => {
  return (
    <section className="py-3 md:py-8 dark:bg-gray-900">
      <div className="px-[2%]">
        <div className="mb-6 border-b border-b-gray-200 pb-2">
          <h2 className="text-2xl font-semibold">Tambah Guru</h2>
          <p className="mt-1 text-sm text-gray-600">
            Lengkapi form di bawah untuk menambahkan guru baru
          </p>
        </div>

        {/* Form */}
        <AddTeacherForm />
      </div>
    </section>
  );
};

export default AddTeacherView;
