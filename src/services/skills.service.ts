import prisma from "@database/client";

const getListSkills = async () => {
	const listSkills = await prisma.skill.findMany({
		select: { id: true, name: true },
	});
	return listSkills;
};

const getSkill = async (id: number) => {
	const skill = await prisma.skill.findUniqueOrThrow({
		where: { id },
		select: { id: true, name: true },
	});
	return skill;
};

export default { getListSkills, getSkill };
