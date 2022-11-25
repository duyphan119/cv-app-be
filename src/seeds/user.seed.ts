import { hash } from "../services/auth.service";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export const userSeed = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const list = await userRepository.find({ where: { isAdmin: true } });
  userRepository.update(
    {
      isAdmin: true,
    },
    {
      phone: "0385981196",
    }
  );
  if (list.length === 0) {
    userRepository.save({
      email: "duychomap123@gmail.com",
      password: await hash("123456"),
      fullName: "Phan Khánh Duy",
      phone: "0385981196",
      isAdmin: true,
    });
  }
};
