import prisma from "@database/client";

const getListInstitutions = async () => {
	const listInstitutions = await prisma.institution.findMany({
		select: { id: true, name: true, type: true },
	});
	return listInstitutions;
};

const getInstitution = async (id: number) => {
	const institution = await prisma.institution.findUniqueOrThrow({
		where: { id },
		select: { id: true, name: true },
	});
	return institution;
};

export default { getListInstitutions, getInstitution };
