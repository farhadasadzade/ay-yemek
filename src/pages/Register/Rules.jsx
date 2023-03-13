import React from "react";
import { Modal } from "antd";

const Rules = ({ visible, toggleRuleModal }) => {
  return (
    <Modal
      bodyStyle={{ overflowY: "scroll", maxHeight: "700px" }}
      onCancel={toggleRuleModal}
      footer={false}
      open={visible}
      maskStyle={{ overflow: "hidden" }}
      className="rules__modal"
    >
      <h2>1. ÜMUMİ ŞƏRTLƏR</h2>
      <p>
        1.1 İstifadəçi bu razılaşmanı qəbul etməklə www.ayyemek.az
        platformasında (bundan sonra platforma) qeydiyyatdan keçir və şərtləri
        qəbul etdiyini təsdiqləyir.
      </p>
      <p>
        1.2 İstifadəçi qeydiyyat zamanı tələb olunan məlumatların doğruluğuna
        özü məsuliyyət daşıyır.
      </p>
      <p>
        1.3 Platforma qaydalarda dəyişiklik etmək, qaydalara zidd hərəkətlərə
        görə əməkdaşlığa xitam vermək, hər hansı xidməti təklif etməkdən imtina
        etmək hüququnu özündə saxlayır.
      </p>
      <p>
        1.4 Platforma qaydalarda edilən dəyişiklik barədə üzvləri
        məlumatlandırmağı təmin edir.
      </p>
      <p>
        1.5 İstifadəçi ona verilmiş tarixlər üzrə yeməklərin çatdırılmasını
        sifariş edir. Sifariş bir gün öncə 21:00-dək platforma üzərindən
        verilməsi təmin edilməlidir.
      </p>
      <p>
        1.6 Yeməklərin daha dəqiq çatdırılması üçün tarix, saat və ünvan
        (lxəritədə) platforma üzərindən seçilməlidir.
      </p>
      <p>
        1.7. İstifadəçi abunə olduğu paketi seçib, həmin paket üzrə menyu
        üzərindən sifarişlərini edə bilər. Yemək çatdırılma ünvanı dəyişdikdə
        onu ən gec 21:00-dək platforma üzərindən bildirməlidir.
      </p>
      <h2>2. MƏXFİLİYİN QORUNMASI</h2>
      <p>
        2.1 Platforma üzvün şəxsi məlumatlarını qorumağa, texniki təhlükəsizliyə
        və məxfiliyə zəmanət verir.
      </p>
      <p>
        2.2 İstifadəçi yemeklərin çatdırılması, şəxsi məlumat və ünvan barədə
        dəyişikləri platforma üzərində etməlidir.{" "}
      </p>
      <p>
        2.3 İstifadəçinin şəxsi məlumatlarının məxfiliyinin qorunmasına
        platforma məsuliyyət daşıyır. Məlumatlar yalnız müstəsna hallarda,
        istifadəçinin yazılı icazəsi və ya məhkəmə qərarı əsasında verilə bilər.{" "}
      </p>
      <p>
        2.4 İstifadəçi şəxsi məlumatlarını (şəxsi cabinet, login və parol) digər
        şəxslərə verməməlidir və buna görə özü məsuliyyət daşıyır.
      </p>
      <h2>
        3. Razılaşmanı qəbul edən tərəflərin məsuliyyəti ( Qaytarılma və
        dəyişdirilmə şərtləri, ödəmə və ləğv etmə qaydası)
      </h2>
      <p>
        3.1 Zəruri və tələb olunan məlumatların platformaya göndərilməməsi, yəni
        istifadəçinin öhdəliklərini icra etməməsi səbəbindən baş vermiş gecikmə
        ilə bağlı istifadəçiyə dəyən zərərə görə “Ay yemək” komandası məsuliyyət
        daşımır.{" "}
      </p>
      <p>
        3.2 İstifadəçi və platforma qarşılıqlı olaraq meydana gələn,
        gözlənilməyən dəyişikliklər barədə bir-birini məlumatlandırmalıdır.
        İstisna hallarda müqaviləyə bütünlüklə və ya qismən xitam vermək və ya
        icrasını dayandırmaq hüququnu tərəflər özündə saxlayır.{" "}
      </p>
      <p>
        3.3 Platformaya üzv olanlardan etik qaydalara uyğun davranmaq tələb
        olunur, şəxslər barədə söyüş, təhqir, böhtan yolverilməzdir. Belə hallar
        üzvün bloklanması və platformadan kənarlaşdırllması üçün əsasdır.{" "}
      </p>
      <p>
        3.4 İstifadəçi yalnız seçdiyi və ödəniş etdiyi xidmətin göstərilməsini
        tələb edə bilər. Digər xidmətlərin göstərilməsi üçün əlavə seçim və
        ödəniş tələb olunur. Ödəniş ödəmə sistemindən online (bank kartları
        vasitəsilə) balansın artırılması ilə həyata keçirilir.{" "}
      </p>
      <p>
        3.5 İstidafəçinin ödəniş etdiyi xidmətdən istifadə etməməsi ödənişin
        geri qaytarılması üçün əsas hesab edilmir.{" "}
      </p>
      <p>
        3.6 Üzvün yaranmış (hüquqi, texniki, internet istifadəsi və s) mübahisə
        ilə bağlı platformaya müraciət etmək hüququ var.{" "}
      </p>
      <p>
        3.7 “Ay yemək” ilə bağlı mübahisələrə məhkəməyə qədər pretenziya
        qaydasında 30 iş günü müddətində baxılır və pretenziya platformaya
        www.ayyemek.az saytı üzərində sorğu yaratmaqla göndərilir.
      </p>
    </Modal>
  );
};

export default Rules;
