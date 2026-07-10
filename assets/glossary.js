// ITSS Ôn tập — Glossary: rê chuột vào thuật ngữ tiếng Anh → hiện giải thích.
// Mỗi mục: [ "thuật ngữ này LÀ GÌ / vai trò trong hệ thống (định nghĩa chuyên môn thực chất)",
//           "cách HÌNH DUNG ngắn (ví von)" ].
// Nguyên tắc: ưu tiên CỤM đầy đủ (Use Case Model, Architectural Design…) để không bắt nhầm từ con;
// giải thích NGHĨA TRONG NGỮ CẢNH môn học, không phải dịch từ vựng.
// Engine ở cuối: quét text trong <main.content>, bọc thuật ngữ bằng <span class="gloss">,
// hiện tooltip #gloss-tip bám con trỏ. KHÔNG sửa lý thuyết — chỉ bọc span lúc chạy.
(function () {
  "use strict";

  /* ================= TỪ ĐIỂN ================= */
  const G = {
    /* ---------- Chương 1: Quy trình & mô hình phát triển ---------- */
    "SLCP": ["Software Life Cycle Process (ISO/IEC 12207) — chuẩn quốc tế liệt kê & đặt tên cho MỌI nhóm công việc trong cả đời một phần mềm, làm 'ngôn ngữ chung' giữa bên đặt hàng và bên làm.", "Bộ từ điển chuẩn để hai công ty nói về 'các bước làm phần mềm' mà hiểu giống nhau."],
    "Software Life Cycle Process": ["Chuẩn ISO/IEC 12207 mô tả toàn bộ vòng đời phần mềm từ lúc có nhu cầu đến khi ngừng dùng (retirement); tổ chức thành 7 nhóm process.", "Lý lịch chuẩn của phần mềm: sinh ra → phát triển → vận hành → nghỉ hưu."],
    "ISO/IEC 12207": ["Số hiệu chính thức của chuẩn vòng đời phần mềm (SLCP), do ISO và IEC đồng ban hành.", "Mã số của bộ quy tắc làm phần mềm — nhắc số này là biết đang nói chuẩn nào."],
    "process": ["Trong SLCP: một NHÓM hoạt động lớn phục vụ một mục đích trong vòng đời phần mềm; phân cấp process → activity → task.", "Một 'phòng ban' lo trọn một mảng việc, bên trong chia thành nhiều đầu việc nhỏ."],
    "activity": ["Đơn vị công việc nằm trong một process, gồm nhiều task; (trong State Machine: việc làm khi vào/ở/ra một state).", "Một 'dự án con' trong phòng ban — to hơn đầu việc lẻ, nhỏ hơn cả process."],
    "task": ["Đơn vị công việc nhỏ nhất, cụ thể, trong phân cấp process → activity → task của SLCP.", "Một đầu việc lẻ trong to-do list — làm xong tick một cái."],
    "Software Implementation Process": ["Nhóm process số 5 của SLCP (6 process con) — 'đội thợ trực tiếp' biến yêu cầu thành mã: Requirements Analysis → Architectural Design → Detailed Design → Construction → Integration → Qualification Testing. Chính là xương sống của môn học.", "Trái tim của SLCP: nhóm thật sự 'xây' ra phần mềm."],
    "Requirements Analysis": ["Process con của Software Implementation: thiết lập yêu cầu (chức năng, giao diện, dữ liệu, phi chức năng, qualification) cho phần mềm. Ứng với Chương 3 (Use Case).", "Bước 'hỏi cho rõ khách muốn gì' trước khi xây."],
    "Architectural Design": ["Process con của Software Implementation (bước 2.2): đưa ra thiết kế cài đặt & kiểm chứng được với yêu cầu — cấu trúc top-level, component, giao diện, DB. Ứng với Chương 4–5.", "Bước vẽ 'bản thiết kế tổng' của căn nhà trước khi vẽ chi tiết."],
    "Detailed Design": ["Process con của Software Implementation (bước 2.3): chi tiết hóa component thành software unit đủ để coding & testing.", "Bước vẽ chi tiết từng căn phòng để thợ thi công."],
    "Construction": ["Process con của Software Implementation (bước 2.4): tạo mã thực thi phản ánh đúng thiết kế, kèm unit test & code coverage. (Cũng là 1 pha của RUP.)", "Bước 'xây thật' — đổ bê tông, dựng tường theo bản vẽ."],
    "Qualification Testing": ["Process con cuối của Software Implementation (bước 2.6): xác nhận sản phẩm đã tích hợp đáp ứng đúng qualification requirements đã định.", "Bước nghiệm thu cuối trước khi bàn giao."],
    "software unit": ["Phần tử phần mềm nhỏ nhất tạo ra ở Detailed Design — code/compile/test được độc lập.", "Một 'viên gạch' đã đủ chuẩn để tự kiểm tra."],
    "component": ["Khối phần mềm ghép từ nhiều unit, có giao diện rõ, là đơn vị lắp ráp của kiến trúc.", "Một 'cụm bộ phận' lắp sẵn của cỗ máy."],
    "OOAD": ["Object-Oriented Analysis and Design — quy trình biến yêu cầu thành thiết kế theo tư duy hướng đối tượng (nhìn hệ thống như tập các object có dữ liệu & hành vi). Có 10 bước, chia cho Architect & Designer.", "Cách làm phần mềm bằng cách hỏi 'có những nhân vật nào, mỗi nhân vật biết gì và làm gì'."],
    "OOA": ["Object-Oriented Analysis — bước tìm ra các đối tượng & trách nhiệm khi phân tích bài toán (chưa lo cài đặt).", "Giai đoạn 'liệt kê nhân vật' của vở kịch."],
    "OOD": ["Object-Oriented Design — bước quyết định các đối tượng phối hợp & cài đặt ra sao (lời giải).", "Giai đoạn 'dựng kịch bản chi tiết' cho từng nhân vật."],
    "Architect": ["Vai trong OOAD lo BỘ KHUNG tổng thể: kiến trúc, phần tử thiết kế, cơ chế, phân tán. Làm các bước 'lớn'.", "Kiến trúc sư trưởng — quyết bố cục cả tòa nhà."],
    "Designer": ["Vai trong OOAD lo CHI TIẾT từng phần: phân tích use case, thiết kế use case/subsystem/class/DB.", "Đội thiết kế nội thất — lo từng căn phòng."],
    "Use-Case Model": ["Sản phẩm chính của bước Requirements: tập hợp Actors + Use Cases + Use-Case Specifications mô tả TOÀN BỘ chức năng hệ thống nhìn từ ngoài.", "Bức tranh tổng 'hệ thống phục vụ ai, làm được những gì'."],
    "Design Model": ["Đầu ra của thiết kế: tập các phần tử thiết kế (design class, package, subsystem) đủ chín để lập trình. Do bước Identify Design Elements tạo ra.", "Bản vẽ thi công chi tiết, từ bản phác thảo phân tích."],
    "Analysis Model": ["Mô hình phân tích: tập các analysis class (boundary/entity/control) + use-case realization, còn ở mức 'phác thảo ý tưởng'.", "Bản nháp bằng bút chì trước khi ra bản vẽ kỹ thuật."],
    "Architecture Document": ["Tài liệu ghi các quyết định kiến trúc quan trọng của hệ thống (còn gọi Software Architecture Document).", "Bản 'hồ sơ thiết kế tổng' của công trình."],
    "Software Architecture Document": ["Tài liệu mô tả kiến trúc tổng thể — đầu vào cho nhiều bước thiết kế.", "Hồ sơ kiến trúc chính thức của dự án."],
    "Top-Down": ["Cách tiếp cận 'từ trên xuống': bắt đầu từ tổng thể rồi chia nhỏ dần. (OOAD không thuần top-down.)", "Xây nhà từ bộ khung tổng rồi mới tới chi tiết."],
    "Bottom-Up": ["Cách tiếp cận 'từ dưới lên': ghép các mảnh nhỏ thành hệ lớn. (OOAD không thuần bottom-up.)", "Xây từ móng lên, chắc từng viên gạch rồi mới lắp cao."],
    "UML": ["Unified Modeling Language — ngôn ngữ sơ đồ chuẩn để mô tả phần mềm bằng hình; nhìn hệ thống qua 4 nhóm view (Structural/Dynamic/Physical/Model Mgmt) và nhiều loại diagram.", "Bộ ký hiệu bản vẽ chung của dân làm phần mềm — ai cũng đọc hiểu."],
    "Unified Modeling Language": ["Bộ sơ đồ chuẩn (class, use case, sequence…) mô tả cấu trúc & hành vi phần mềm; tổng hợp từ Booch, OMT (Rumbaugh), OOSE (Jacobson).", "Ngôn ngữ hình vẽ chung cho lập trình viên toàn cầu."],
    "Static view": ["Góc nhìn TĨNH của UML: cấu trúc cố định — có những lớp/đối tượng nào, quan hệ ra sao (Class diagram, ER). Không đổi theo thời gian.", "Tấm ảnh đội hình đứng chụp trước trận: ai ở vị trí nào."],
    "Dynamic view": ["Góc nhìn ĐỘNG của UML: hành vi theo thời gian — object gọi nhau, đổi trạng thái (Sequence, Activity, State machine).", "Đoạn video trận đấu: bóng chuyền qua chuyền lại."],
    "Class diagram": ["Sơ đồ UML tĩnh vẽ các lớp (thuộc tính, thao tác) và quan hệ giữa chúng; dùng làm từ vựng hệ thống, sơ đồ cộng tác, và lược đồ CSDL logic.", "Ảnh đội hình tĩnh của mọi 'nhân vật' trong hệ thống."],
    "Use case diagram": ["Sơ đồ UML mô tả các actor, các use case và quan hệ — bức tranh tổng 'ai làm được gì'. Thuộc nhóm động (mô tả hệ thống làm gì).", "Thực đơn có hình dán ngoài cửa: ai gọi được món nào."],
    "Sequence diagram": ["Interaction diagram nhấn mạnh THỨ TỰ THỜI GIAN của message giữa object; đọc từ trên xuống; gồm lifeline, message, execution occurrence.", "Biên bản cuộc họp ghi theo phút: ai nói gì trước–sau."],
    "Communication diagram": ["Interaction diagram nhấn mạnh TỔ CHỨC (ai nối với ai); vẽ object + link + message có đánh số. Tương đương ngữ nghĩa với sequence diagram.", "Sơ đồ chỗ ngồi có mũi tên ai nói với ai."],
    "State machine diagram": ["Sơ đồ UML động mô tả các state của một object và transition giữa chúng khi có event.", "Bản đồ 'các tâm trạng' và cách object nhảy giữa chúng."],
    "Activity diagram": ["Sơ đồ UML dạng lưu đồ (flowchart) thể hiện dòng điều khiển giữa các activity/action, có rẽ nhánh (decision) và song song (fork/join); dùng để trực quan hóa luồng use case.", "Bản đồ mê cung của một quy trình, có ngã rẽ và làn song song."],
    "Component diagram": ["Sơ đồ UML thể hiện các component phần mềm và quan hệ lắp ghép giữa chúng.", "Sơ đồ 'các cụm bộ phận' và cách chúng cắm vào nhau."],
    "Deployment diagram": ["Sơ đồ UML (nhóm Physical) mô tả phần mềm được triển khai lên phần cứng/node nào.", "Bản đồ 'phần mềm chạy trên máy nào'."],
    "Package diagram": ["Sơ đồ UML (nhóm Model Management) thể hiện các package và phụ thuộc giữa chúng.", "Sơ đồ các 'thư mục' và đường phụ thuộc."],
    "Waterfall": ["Mô hình phát triển tuyến tính: các pha nối tiếp (Requirement → Design → Implementation → Integration → Operation), xong hẳn pha này mới sang pha kia. Waterfall thuần không có feedback.", "Nước chảy từ bậc cao xuống thấp, không chảy ngược — sai ở cuối thì sửa rất đắt."],
    "Iterative Waterfall": ["Biến thể Waterfall cho phép QUAY LUI giữa các pha kề nhau (có feedback).", "Thác nước nhưng được leo ngược lên một bậc để sửa."],
    "Iterative Model": ["Mô hình lặp: chia dự án thành nhiều vòng, mỗi vòng làm đủ các bước và cho ra một bản chạy được (executable release). Chữa nhược điểm 'đến cuối mới biết sai' của Waterfall.", "Họa sĩ phác từng lớp: mỗi vòng bức tranh rõ hơn, khách góp ý sớm."],
    "Incremental": ["Mô hình tăng dần: giao sản phẩm thành từng phần hoàn chỉnh, cộng dồn lại thành cả hệ thống.", "Xây chung cư cho ở dần từng tầng, không đợi xong cả tòa."],
    "Prototype Model": ["Mô hình dựng bản mẫu (prototype) nhanh cho khách dùng thử để chốt yêu cầu, rồi mới làm thật; vòng lặp Listen → Build/Revise → Customer Test-Drive. Dùng khi khách còn mơ hồ.", "Dựng mô hình nhà bằng bìa cứng cho khách gật/lắc trước khi đổ bê tông."],
    "Prototype": ["Bản mẫu làm nhanh để khách xem/thử và chốt yêu cầu, thường bỏ đi sau đó.", "Nhà mẫu bằng bìa cứng — cho xem trước, không phải nhà thật."],
    "Spiral Model": ["Mô hình xoắn ốc: lặp + mỗi vòng đi qua 4 góc (Planning · Risk analysis · Engineering · Customer evaluation) với PHÂN TÍCH RỦI RO là điểm nhấn. Hợp dự án lớn, nhiều bất định.", "Leo núi theo đường xoắn: mỗi vòng dừng xem chỗ nào nguy hiểm rồi mới đi tiếp."],
    "RUP": ["Rational Unified Process — quy trình lặp, hướng use case, chia 4 pha (Inception → Elaboration → Construction → Transition); các discipline chạy song song với cường độ khác nhau theo pha.", "Giáo án chuẩn của IBM: chia dự án thành 4 'học kỳ' có mục tiêu rõ."],
    "Rational Unified Process": ["Quy trình phát triển lặp & tăng dần, 4 pha với các mốc (milestone) rõ ràng.", "Bộ khung dự án bài bản: mỗi pha một cột mốc phải đạt."],
    "Inception": ["Pha 1 của RUP: khởi đầu — xác định phạm vi, tính khả thi, ca sử dụng chính.", "Buổi 'khảo sát & chốt ý tưởng' đầu dự án."],
    "Elaboration": ["Pha 2 của RUP: chi tiết hóa — dựng kiến trúc nền, giảm rủi ro lớn. (Architectural Analysis làm sớm ở pha này.)", "Giai đoạn 'thiết kế kỹ & thử nghiệm chỗ khó'."],
    "Transition": ["Pha 4 của RUP: chuyển giao — đưa sản phẩm tới người dùng, tinh chỉnh cuối.", "Bàn giao & 'chạy rà' cho khách."],
    "discipline": ["Trong RUP: một loại công việc (Business Modeling, Requirements, Analysis & Design, Implementation, Test, Deployment…) chạy xuyên suốt các pha với cường độ khác nhau.", "Một 'bộ môn' của dự án, chơi đậm nhạt tùy pha."],
    "iteration": ["Một vòng lặp phát triển có thời hạn cố định, cho ra một phần sản phẩm chạy được.", "Một 'tập phim' ngắn, trọn vẹn, nối thành cả bộ."],
    "milestone": ["Cột mốc đánh dấu một pha/mục tiêu đã đạt (đặc biệt trong RUP).", "Trạm dừng trên đường — tới đó là biết đi được bao xa."],
    "executable": ["Bản build chạy được sinh ra sau mỗi vòng lặp (executable release) — bằng chứng tiến độ thật.", "Bản 'chạy được' để demo, không phải giấy tờ suông."],
    "Agile": ["Trường phái phát triển linh hoạt: chia nhỏ, giao liên tục, coi THAY ĐỔI là đương nhiên và thiết kế cách làm để đón nó; đề cao con người & phản hồi hơn tài liệu cứng.", "Nấu và nêm nếm liên tục theo khẩu vị khách, thay vì bám cứng công thức từ đầu."],
    "Agility": ["Khả năng vừa TẠO RA vừa ĐÁP ỨNG thay đổi để có lợi trong môi trường biến động (Jim Highsmith) — tinh thần cốt lõi của Agile.", "Sự nhanh nhẹn: đổi hướng kịp khi hoàn cảnh đổi."],
    "Agile Manifesto": ["Bản tuyên ngôn 4 giá trị (coi trọng: cá nhân & tương tác / phần mềm chạy được / hợp tác với khách / đáp ứng thay đổi — HƠN các thứ đối lập) + 12 nguyên tắc, làm nền cho Agile.", "Bản hiến pháp của phe làm phần mềm linh hoạt."],
    "sprint": ["Một vòng lặp ngắn, cố định thời gian trong Agile (Plan→Design→Build→Test→Review→Launch) cho ra phần sản phẩm dùng được.", "Một 'chặng nước rút' ngắn, xong là có kết quả sờ được."],
    "Working software": ["Giá trị Agile: phần mềm CHẠY ĐƯỢC là thước đo tiến độ chính (hơn tài liệu đầy đủ).", "Thà có bản chạy thật còn hơn chồng tài liệu đẹp."],
    "self-organizing": ["Đội TỰ TỔ CHỨC trong Agile: nhóm tự quyết cách làm, kiến trúc/thiết kế tốt nhất nảy sinh từ đó.", "Đội bóng tự dàn xếp đội hình, không cần ai cầm tay chỉ từng bước."],

    /* ---------- Chương 2: Version Control & Git ---------- */
    "Version Control": ["Việc lưu lại LỊCH SỬ mọi thay đổi của mã nguồn và cho nhiều người cùng làm mà không đè lên nhau; cho phép quay lại bất kỳ phiên bản nào và merge công sức nhiều người.", "Cỗ máy thời gian + sổ nhật ký ghi ai sửa gì, lúc nào."],
    "VCS": ["Version Control System — phần mềm quản lý phiên bản mã nguồn (như Git). Giữ nhiều phiên bản, bắt ghi comment mỗi thay đổi, cho check-in/check-out, chỉ ra khác biệt.", "Cỗ máy thời gian cho code — quay lại bất kỳ lúc nào từng lưu."],
    "diff": ["Công cụ chỉ tô ra CHỖ KHÁC NHAU giữa hai phiên bản/file (vd diff, jDiff). Hữu ích nhưng CHƯA phải VCS đầy đủ.", "Kính lúp soi điểm khác biệt giữa hai bản."],
    "Lock-Modify-Unlock": ["Mô hình VCS: khóa file trước khi sửa để độc quyền, sửa xong mở khóa; mỗi lúc chỉ một người sửa được → tuần tự hóa, dễ tắc nghẽn.", "Nhà vệ sinh một buồng có ổ khóa: người sau xếp hàng đợi."],
    "Copy-Modify-Merge": ["Mô hình VCS: ai cũng copy bản riêng sửa đồng thời, khi commit đụng nhau thì update + merge; đa số merge tự động (SVN, Git).", "Mỗi người photo một bản về sửa, cuối buổi ghép lại."],
    "Distributed Version Control": ["Mô hình VCS phân tán: mỗi người CLONE toàn bộ repo + lịch sử về máy (local repository), làm & commit offline, rồi push lên remote. Triết lý của Git.", "Mỗi người có hẳn một bản sao đầy đủ của cả thư viện."],
    "Centralized": ["Kiến trúc VCS tập trung: chỉ MỘT repository trên server, mọi người commit/update trực tiếp lên đó (SVN, TFS). Offline hạn chế.", "Một thư viện duy nhất ai cũng phải tới mượn — sập là kẹt."],
    "Distributed": ["Kiến trúc VCS phân tán: một remote + nhiều local repo đầy đủ, làm offline tốt (Git, Mercurial).", "Mỗi máy giữ một bản sao đầy đủ — mất một bản vẫn còn."],
    "repository": ["Kho chứa toàn bộ mã nguồn + lịch sử thay đổi (change log) của dự án.", "Tủ hồ sơ lưu mọi bản nháp từng có của dự án."],
    "local repository": ["Bản sao repo đầy đủ nằm trên máy bạn (đặc trưng VCS phân tán) — commit được ngay cả khi offline.", "Bản sao cả thư viện để ở nhà bạn, dùng offline."],
    "working copy": ["Bản mã đang nằm trên máy để bạn sửa (lấy về bằng check-out/clone), khác với bản trong repo.", "Bàn làm việc của bạn — nơi đang bày ra sửa."],
    "commit": ["Ghi một lần thay đổi (từ working copy) vào lịch sử repo, kèm comment; tạo một phiên bản mới. Trong VCS phân tán, commit trước là cục bộ.", "Bấm 'Save' và dán nhãn 'đã làm gì' cho mốc này."],
    "check-in": ["Đồng nghĩa commit — gửi thay đổi lên repo.", "Nộp bản sửa vào kho chung."],
    "check-out": ["Lấy bản làm việc (working copy) từ repo về (có thể kèm khóa trong Lock-Modify-Unlock).", "Mượn tài liệu từ kho về bàn làm việc."],
    "clone": ["Sao TOÀN BỘ repo (kèm lịch sử) từ remote về máy, tạo một local repository.", "Tải cả cuốn sách kèm mọi bản nháp về máy."],
    "push": ["Đẩy các commit cục bộ lên remote để chia sẻ với cả nhóm.", "Gửi phần việc của mình lên kho chung."],
    "pull": ["Kéo thay đổi mới nhất từ remote về máy = fetch + merge; giải quyết conflict cục bộ rồi push lại.", "Tải bài mới của cả nhóm về rồi trộn vào bản mình."],
    "fetch": ["Tải về các commit mới từ remote nhưng CHƯA merge vào bản làm việc.", "Nhận hàng về kho, chưa mở ra dùng."],
    "merge": ["Trộn thay đổi từ hai nhánh/hai người làm một; phần lớn tự động, đụng nhau thì sinh conflict.", "Nhập hai bản nháp của hai người thành một bản chung."],
    "conflict": ["Xung đột: nhiều người sửa cùng một chỗ khác nhau, máy không tự quyết giữ bản nào → phải giải quyết thủ công.", "Hai người ghi đè lên cùng một dòng — phải có người phân xử."],
    "branch": ["Một nhánh làm việc song song, tách ra để làm tính năng/thử nghiệm mà không đụng bản chính; xong thì merge về.", "Tách một bản sao để nghịch: hỏng thì bỏ, được thì gộp về."],
    "revision": ["Một phiên bản cụ thể của tài liệu/mã sau nhiều thay đổi (còn gọi version).", "Một 'bản in' cụ thể, có số hiệu riêng."],
    "change set": ["Tập các thay đổi trên nhiều file sẽ được commit cùng một lúc (change list).", "Một 'lô hàng' các sửa đổi gói chung để nộp một lần."],
    "revert": ["Hủy thay đổi cục bộ, phục hồi trạng thái từ repo (undo changes).", "Nút Undo về đúng bản đã lưu trong kho."],
    "tag": ["Đặt nhãn cho một nhóm file ở một phiên bản nhất định (vd bản phát hành v1.0).", "Dán sticky note 'v1.0' vào đúng trang cần nhớ."],
    "Git": ["Hệ quản lý phiên bản phân tán phổ biến nhất: làm với local & remote repo, có CLI (git bash), miễn phí & mã nguồn mở.", "Cỗ máy thời gian cho code mà cả thế giới lập trình dùng."],
    "GitHub": ["Dịch vụ host repo Git phổ biến nhất (miễn phí cho open-source, có bản private trả phí).", "Chợ/kho chung trên mạng để lưu và chia sẻ repo Git."],

    /* ---------- Chương 3: Use Case ---------- */
    "requirement": ["Yêu cầu — điều hệ thống PHẢI làm (chức năng) hoặc PHẢI đạt (chất lượng), làm cơ sở thỏa thuận giữa khách và đội làm, ước lượng chi phí/thời gian.", "Đơn đặt hàng ghi rõ khách muốn gì."],
    "functional requirement": ["Yêu cầu chức năng — hệ thống phải LÀM được gì (đăng ký, thanh toán…); nắm bằng use case.", "Danh sách 'việc' phần mềm phải làm được."],
    "non-functional requirement": ["Yêu cầu phi chức năng — CHẤT LƯỢNG phải đạt (nhanh, tin cậy, an toàn, dễ dùng…), không gắn với một use case cụ thể; gom trong Supplementary Specification theo FURPS.", "Không phải 'làm gì' mà là 'làm tốt tới mức nào'."],
    "Use Case": ["Một 'ca sử dụng' — mô tả chuỗi sự kiện do hệ thống thực hiện, mang lại KẾT QUẢ CÓ GIÁ TRỊ quan sát được cho một actor cụ thể. Đặt tên verb-noun (vd 'Register for Courses').", "Một dịch vụ trọn gói: khách vào, làm xong một việc có ích, rồi ra về."],
    "Use-Case Specification": ["Bản mô tả CHI TIẾT một use case (Code, Name, Flow of Events, pre/postcondition, relationships…); là 'hợp đồng' giữa khách & developer, dùng ở mọi pha.", "Công thức nấu chi tiết cho một món trong thực đơn."],
    "actor": ["Vai NGOÀI hệ thống tương tác với nó — người, hệ thống khác, thiết bị hay database. Là một VAI TRÒ (role), không phải người cụ thể: một người đóng nhiều vai, một vai do nhiều người đóng.", "Khách/đối tác đứng ngoài gọi dịch vụ, không phải nhân viên trong bếp."],
    "scenario": ["Một đường đi cụ thể qua flow of events của use case — tức một INSTANCE (thể hiện) của use case. Mỗi scenario → một test case ở Chương 9.", "Một 'lượt chơi' cụ thể theo kịch bản chung."],
    "flow of events": ["Chuỗi bước tuần tự mô tả actor và hệ thống trao đổi trong use case; gồm một basic flow + nhiều alternative flow.", "Kịch bản từng câu thoại của một cảnh diễn."],
    "basic flow": ["Luồng chính (normal flow) — kịch bản mọi thứ suôn sẻ, không sự cố.", "Con đường thẳng đẹp khi không gặp trục trặc."],
    "alternative flow": ["Luồng thay thế — nhánh rẽ khi có biến thể/ngoại lệ (regular variant, odd case, exceptional flow). Đánh số 4a, 6a…", "Lối rẽ khi đường chính gặp chướng ngại."],
    "generalization": ["Quan hệ tổng quát hóa (cha–con): cái con là trường hợp đặc biệt của cái cha, kế thừa & có thể thay thế cha. 'is a kind of'. Dùng cho actor và use case.", "'Chó là một loại Động vật' — có mọi thứ của cha, thêm nét riêng."],
    "include": ["Quan hệ giữa use case: use case gốc LUÔN LUÔN tích hợp hành vi của use case được include (bắt buộc, tách ra để tái sử dụng). Trong spec: gọi tường minh (call) tại một inclusion point.", "Mọi giao dịch ATM đều 'gồm' bước Xác thực — tách ra dùng chung. include = always."],
    "extend": ["Quan hệ giữa use case: use case mở rộng CHỈ chèn thêm vào gốc tại extension point KHI điều kiện đúng (tùy chọn); gốc vẫn chạy được nếu không mở rộng.", "'Thêm topping' — chỉ khi khách chọn. extend = maybe."],
    "association": ["Quan hệ CẤU TRÚC lâu dài giữa hai lớp/đối tượng: chúng biết & nối với nhau (giữ field tham chiếu). Giữa actor↔use case là kênh giao tiếp (communicates). 'use-a'.", "Hai người quen biết, có đường dây liên lạc lâu dài giữa họ."],
    "precondition": ["Trạng thái hệ thống phải ĐÚNG TRƯỚC khi use case bắt đầu; phát biểu đơn giản, dễ kiểm chứng, không tham chiếu use case khác. Tùy chọn.", "'Phải có vé mới được vào rạp' — điều kiện cửa vào."],
    "postcondition": ["Trạng thái hệ thống được bảo đảm SAU khi use case kết thúc. Postcondition của UC này có thể trùng precondition của UC khác → dùng để xâu chuỗi thứ tự.", "'Ra khỏi rạp là đã xem xong phim' — kết quả cam kết."],
    "subflow": ["Đoạn hành vi lặp phức tạp trong use case được tách riêng và gọi lại từ basic flow (vd 'S1: Obtain Course Information').", "Một 'đoạn điệp khúc' tách riêng để hát lại nhiều lần."],
    "Glossary": ["Bảng thuật ngữ nghiệp vụ dùng chung — định nghĩa rõ các thuật ngữ quan trọng cho MỌI mô hình, để domain expert & developer hiểu giống nhau. Chỉ có MỘT cho cả hệ thống.", "Từ điển của dự án — để không ai cãi nhau vì hiểu khác nghĩa."],
    "Supplementary Specification": ["Tài liệu gom yêu cầu (nhất là phi chức năng) KHÔNG gắn với một use case cụ thể, tổ chức theo FURPS.", "Phần ghi chú chung cho những điều không nhét vừa vào từng kịch bản."],
    "FURPS": ["Mô hình 5 loại yêu cầu chất lượng: Functionality, Usability, Reliability, Performance, Supportability — dùng để tổ chức Supplementary Specification.", "5 chữ cái để nhớ 5 tiêu chí 'phần mềm tốt cỡ nào'."],
    "Functionality": ["Trong FURPS: các yêu cầu chức năng chung cho nhiều use case.", "Nhóm 'làm được những gì' ở mức tổng."],
    "Usability": ["Tính dễ dùng — thao tác thuận tiện, ít cần đào tạo (một tiêu chí FURPS & chất lượng).", "Cái remote mà bà cũng bấm được ngay."],
    "Reliability": ["Độ tin cậy — phần mềm chạy đúng, ít lỗi, ít sập (đo bằng MTBF, số lỗi/1000 dòng…).", "Chiếc xe 'nổ máy là chạy', hiếm khi chết máy."],
    "Performance": ["Hiệu năng — tốc độ/đáp ứng của phần mềm (thời gian phản hồi cụ thể).", "Quán ăn ra món nhanh dù đông khách."],
    "Supportability": ["Khả năng hỗ trợ/bảo trì — dễ sửa, dễ nâng cấp về sau.", "Nhà đi dây gọn: thợ tới là thấy ngay chỗ cần sửa."],

    /* ---------- Chương 4: Kiến trúc & phân tích OO ---------- */
    "Analysis class": ["Lớp phân tích — lớp sơ bộ tìm ra khi phân tích, chia 3 vai (boundary/entity/control); là 'bước đầu tiên hướng tới bản thực thi' trong chuỗi Use Case → Analysis Class → Design Element → Code.", "Nhân vật nháp của hệ thống, chưa chi tiết, chỉ để hiểu ai làm gì."],
    "Boundary class": ["Lớp biên — trung gian giữa hệ thống & thứ bên ngoài (User/System/Device interface). Phụ thuộc môi trường. Quy tắc: một boundary cho mỗi cặp actor–use case.", "Lễ tân/bồi bàn — chỗ hệ thống 'nói chuyện' với thế giới ngoài."],
    "Entity class": ["Lớp thực thể — giữ & quản lý thông tin cốt lõi cần nhớ lâu dài (key abstraction, vd Student, Course). Độc lập môi trường; thường thành bảng CSDL ở Chương 8.", "Kho hàng — nơi cất dữ liệu quý bền vững."],
    "Control class": ["Lớp điều khiển — điều phối hành vi của một use case, nối boundary với entity. Phụ thuộc use case, độc lập môi trường. Thường 1 control cho mỗi use case.", "Bếp trưởng — không tiếp khách, không giữ kho, chỉ điều phối 'làm gì trước, gọi ai'."],
    "key abstraction": ["Khái niệm cốt lõi nhất của bài toán mà hệ thống phải mô hình hóa — thường trở thành entity class.", "Những 'danh từ' quan trọng nhất của đề bài."],
    "stereotype": ["Nhãn «...» gắn vào phần tử UML để chỉ VAI (vd «boundary», «control», «entity», «interface») — kim chỉ nam phân loại.", "Cái 'biển tên vai diễn' dán trên mỗi nhân vật."],
    "Use-Case Realization": ["Hiện thực hóa use case — 'màn kịch' cho thấy các analysis class phối hợp thế nào để làm xong một use case; gồm Sequence + Communication + Class diagram.", "Bản dàn dựng cho thấy các diễn viên diễn xong một cảnh ra sao."],
    "Interaction Diagram": ["Tên chung cho sơ đồ nhấn mạnh TƯƠNG TÁC giữa object (gửi message): Sequence & Communication (+ Timing, Interaction Overview).", "Sơ đồ 'các nhân vật nhắn tin cho nhau'."],
    "lifeline": ["Đường đời dọc của một object trong sequence diagram (trục thời gian).", "Làn bơi riêng của mỗi nhân vật, kéo dài theo thời gian."],
    "message": ["Một object gọi/nhờ object khác làm việc — đơn vị tương tác trong interaction diagram. Mỗi message object nhận → một trách nhiệm (operation) của lớp đó.", "Một lời nhắn/lời nhờ giữa các nhân vật."],
    "link": ["Đường nối giữa hai object trong communication diagram (là instance của một association). 'Relationship for every link': mỗi link → một association trong class diagram.", "Sợi dây nối hai nhân vật đang nói chuyện."],
    "execution occurrence": ["Thanh dọc trên lifeline biểu thị khoảng thời gian object đang thực thi một việc.", "Đoạn 'đang bận làm' của nhân vật trên trục thời gian."],
    "Architectural pattern": ["Giải pháp tổng quát, tái sử dụng cho một vấn đề kiến trúc thường gặp (performance, high availability…); nhiều pattern đã cài sẵn trong framework (MVC, 3-tier, Microservices).", "Kiểu bố trí nhà đúc sẵn cho cả công trình phần mềm."],
    "MVC": ["Model–View–Controller — mẫu kiến trúc chia phần mềm làm 3: Model (dữ liệu ~ Entity), View (hiển thị ~ Boundary), Controller (điều phối ~ Control). Có bản active & passive.", "Nhà hàng: kho (Model), món bày bàn (View), bồi bàn (Controller)."],
    "active MVC": ["MVC kiểu vòng tròn: Model NOTIFY View (observer) khi đổi → View phụ thuộc trực tiếp Model.", "Kho tự 'báo' cho quầy trưng bày mỗi khi có hàng mới."],
    "passive MVC": ["MVC kiểu: Request → Controller → Model → Controller gọi View render; View KHÔNG tự lắng nghe Model.", "Quầy trưng bày chỉ bày khi bồi bàn mang món ra, không tự dòm kho."],
    "3-tier": ["Kiến trúc 3 tầng xếp THẲNG ĐỨNG: Presentation Layer → Business Logic Layer → Data Access Layer → Database; tầng trên chỉ gọi tầng ngay dưới (tuyến tính). Khác MVC (tam giác).", "Các tầng một tòa nhà: đi từng bậc cầu thang, không nhảy cóc."],
    "Presentation Layer": ["Tầng giao diện của kiến trúc 3-tier (.aspx, code-behind) — ứng với View.", "Mặt tiền cửa hàng — nơi khách nhìn và bấm."],
    "Business Logic Layer": ["Tầng xử lý nghiệp vụ của 3-tier — ứng với Controller + logic.", "Khu xử lý đơn: nơi 'nghĩ và quyết' của hệ thống."],
    "Data Access Layer": ["Tầng truy cập dữ liệu của 3-tier (nối tới Database) — ứng với Model.", "Thủ kho — chỉ nó được vào Database lấy/cất đồ."],
    "Front-end": ["Phần chạy phía người dùng (UI & API, caching); có thể dùng mẫu kiến trúc khác với back-end.", "Mặt tiền cửa hàng — nơi khách thấy và chạm."],
    "Back-end": ["Phần chạy phía máy chủ (lưu trữ lớn, xử lý dữ liệu, phân tích chạy lâu); người dùng không thấy.", "Khu bếp và kho phía sau — làm việc nặng, khách không thấy."],
    "MVVM": ["Model–View–ViewModel — biến thể MVC: ViewModel làm cầu nối, data binding & commands tự đồng bộ View với Model; tách Presentation Logic khỏi Business Logic.", "Trợ lý tự đồng bộ bảng số liệu với màn hình — đổi bên nào bên kia tự cập nhật."],
    "MVP": ["Model–View–Presenter — biến thể MVC (Android): Presenter làm trung gian xử lý logic, View (Activity/Fragment) rất mỏng.", "View là 'màn hình câm', Presenter mới là bộ não phía sau."],
    "Flux": ["Kiến trúc dữ liệu chảy MỘT CHIỀU (React): Action → Dispatcher → Store → View → (Action…). Dễ lần theo trạng thái.", "Dây chuyền một chiều: dữ liệu chỉ chảy một hướng, khỏi rối."],
    "VIPER": ["Kiến trúc chia rất mịn (iOS): View · Interactor · Presenter · Entity · Routing — mỗi phần một trách nhiệm rõ.", "Chia việc thật mảnh cho từng chuyên viên, ai lo phần nấy."],

    /* ---------- Chương 5: Phần tử thiết kế ---------- */
    "Design Element": ["Phần tử thiết kế — thứ cụ thể trong Design Model (design class, package, subsystem, interface) suy ra từ analysis class theo ánh xạ nhiều–nhiều.", "Nhân vật chính thức, sau khi biến bản nháp phân tích thành thiết kế thật."],
    "design class": ["Lớp thiết kế — lớp đã chi tiết đủ để lập trình (thuộc tính, thao tác, kiểu, visibility). Một analysis class có thể thành nhiều design class, hoặc cả package/subsystem.", "Bản vẽ thi công của một nhân vật, đủ để coder làm theo."],
    "Package": ["Cơ chế nhóm các phần tử thiết kế thành nhóm có tên (không cung cấp hành vi); là đơn vị tổ chức & quản lý cấu hình. Có luật package coupling & element visibility.", "Thư mục/ngăn kéo có dán nhãn để gom lớp cho gọn."],
    "package coupling": ["Mức các package phụ thuộc lẫn nhau — cần giữ LỎNG. 3 điều cấm: không cross-coupled (phụ thuộc vòng), tầng dưới không phụ thuộc tầng trên, không nhảy tầng (skip layers).", "Luật đi lại giữa các hộp: dòng phụ thuộc chảy một chiều từ trên xuống, qua từng tầng kề."],
    "cross-coupled": ["Hai package phụ thuộc VÒNG lẫn nhau (A cần B, B cần A) — vi phạm coupling, gỡ không ra.", "Hai hộp ôm chặt nhau: rút một cái kéo theo cái kia."],
    "packaging criteria": ["Tiêu chí quyết định gom lớp nào vào chung một package: đơn vị cấu hình, phân bổ nhóm phát triển, phản ánh loại user, sản phẩm dùng sẵn.", "Quy tắc 'món nào xếp chung ngăn'."],
    "Encapsulation": ["Đóng gói — giấu chi tiết bên trong, chỉ cho truy cập qua phần công khai. Trong package: chỉ lớp public mới được tham chiếu từ ngoài, lớp private (–) bị ẩn. Nguyên lý OO nền tảng.", "Viên thuốc bọc vỏ: bên ngoài chỉ uống, không móc ruột ra được."],
    "Subsystem": ["Hệ thống con — phần tử HIỆN THỰC một/nhiều interface, đóng gói HOÀN TOÀN hành vi bên trong, chỉ lộ ra qua interface; dễ thay thế (replaceable). Khác package (chỉ gom, không giấu, không cung cấp hành vi).", "Lò vi sóng: bấm nút bên ngoài, ruột bên trong giấu kín."],
    "interface": ["Bản hợp đồng liệt kê các operation mà một subsystem/lớp cung cấp, KHÔNG nói cách cài đặt; tên bắt đầu bằng 'I' (vd ICourseCatalogSystem). Nền tảng của loose coupling & DIP.", "Ổ cắm điện chuẩn: đúng chuẩn là cắm được, khỏi cần biết nhà máy điện làm sao."],

    /* ---------- Chương 6: Interface Design ---------- */
    "GUI": ["Graphical User Interface — giao diện đồ họa (nút, ô, cửa sổ); thiết kế bằng cách biến boundary class thành màn hình theo 4 bước: chuẩn hóa → ảnh màn hình → sơ đồ chuyển màn → đặc tả.", "Mặt bấm có hình ảnh, thay vì gõ lệnh khô khan."],
    "Graphical User Interface": ["Giao diện đồ họa người dùng — nửa đầu của thiết kế giao diện, nhấn mạnh CHUẨN HÓA (standardize) cho mọi màn hình nhất quán.", "Bộ mặt có nút bấm mà người dùng nhìn & chạm."],
    "standardize": ["Chuẩn hóa cấu hình màn hình: thống nhất vị trí nút, cách báo lỗi/message, phối màu, phím tắt… cho mọi màn giống nhau.", "Chuỗi cửa hàng: quầy thu ngân luôn ở một chỗ, biển giá cùng font."],
    "Screen Transition Diagram": ["Sơ đồ chuyển màn — vẽ 'bấm ở màn này thì nhảy sang màn nào'; có 4 mẫu chuyển (simple, dependent child, independent child, dependent screen kèm dữ liệu).", "Bản đồ các phòng và cửa nối giữa chúng."],
    "screen spec": ["Đặc tả màn hình — mô tả chi tiết từng màn (screen image, list of functions, field attributes) để lập trình viên làm y hệt.", "Bản vẽ kỹ thuật cho một màn hình."],
    "field attributes": ["Thuộc tính của từng ô nhập/hiển thị: số ký tự, kiểu (Numeral/Character), màu, canh lề, 'error items blink'…", "Luật của mỗi ô trong tờ khai: 'chỉ nhập số, 12 chữ số'."],
    "User interface": ["Kiểu boundary class giao tiếp với NGƯỜI dùng (màn hình). Guideline: tập trung 'trình bày thông tin gì', không sa đà chi tiết UI.", "Bồi bàn nói chuyện trực tiếp với khách."],
    "System interface": ["Kiểu boundary class giao tiếp với HỆ THỐNG khác. Guideline: tập trung 'giao thức nào cần định nghĩa'.", "Cửa giao tiếp với đối tác bên ngoài."],
    "Device interface": ["Kiểu boundary class giao tiếp với THIẾT BỊ (máy in, cảm biến…).", "Cửa nối với máy móc phần cứng."],
    "Provided interface": ["Interface mà một subsystem CUNG CẤP (ký hiệu que-bóng tròn ─○): 'tôi cấp dịch vụ này'.", "Chuôi cắm ở bên tường — cung cấp điện."],
    "Required interface": ["Interface mà một subsystem CẦN từ nơi khác (ký hiệu que-nửa vòng ○–): 'tôi cần dịch vụ này'.", "Ổ cắm của thiết bị — cần điện để chạy."],
    "Gates": ["Điểm kết nối ở BIÊN của sequence diagram cho message đi vào/ra khỏi một subsystem/tương tác; tên message nối = tên gate.", "Cổng bảo vệ khu chung cư: mọi ra vào đều qua đó."],
    "Black-box view": ["Nhìn subsystem từ NGOÀI: chỉ thấy interface & hành vi qua gate, không thấy bên trong.", "Nhìn cái hộp kín: chỉ biết cổng và nó làm gì."],
    "White-box view": ["Nhìn subsystem từ TRONG (Internal structure): thấy các design element bên trong phối hợp (Subsystem Manager điều phối).", "Mở nắp hộp ra xem các phần bên trong chạy thế nào."],

    /* ---------- Chương 7: Class Design ---------- */
    "operation": ["Khai báo một việc lớp LÀM ĐƯỢC (từ message trong interaction diagram): tên + tham số + kiểu trả về (signature) + visibility. Là 'lời hứa', khác method (cách làm).", "Tên món trên thực đơn — nói 'làm được gì'."],
    "method": ["Phần CÀI ĐẶT cụ thể (thuật toán) của một operation — cách hiện thực dùng object/attribute/relationship nào.", "Công thức nấu trong bếp — 'làm thế nào'."],
    "signature": ["Chữ ký hàm: operationName([direction] param: class,...): returnType. Direction = in (mặc định)/out/inout. Định danh một operation.", "Họ tên + đặc điểm để phân biệt hai thao tác trùng tên."],
    "visibility": ["Mức truy cập cưỡng chế encapsulation: + Public (ai cũng gọi), # Protected (lớp con), - Private (nội bộ lớp).", "Mức riêng tư: cửa hàng mở / phòng riêng gia đình / két sắt."],
    "scope": ["Tầm của thuộc tính/thao tác: Instance scope (mỗi object một bản riêng) hay Classifier scope (cả lớp xài chung một bản, như static, vẽ gạch chân).", "Của riêng mỗi người / của chung cả nhà."],
    "Aggregation": ["Association đặc biệt whole–part LỎNG ('has-a'): tổng thể gồm bộ phận, nhưng bộ phận SỐNG ĐỘC LẬP được (truyền từ ngoài vào). Ký hiệu thoi rỗng ◇.", "Xe ◇ Bánh: tháo bánh lắp xe khác vẫn dùng được."],
    "Composition": ["Aggregation MẠNH ('is entirely made of'): bộ phận thuộc trọn tổng thể, không chia sẻ, CHẾT CÙNG tổng thể (tổng thể tự tạo & giữ, thường final). Ký hiệu thoi đặc ◆.", "Xe ◆ Khung sườn: đập bỏ xe thì khung cũng đi luôn."],
    "Dependency": ["Quan hệ PHI cấu trúc, TẠM THỜI: lớp này dùng lớp kia thoáng qua (biến cục bộ, tham số, global) chứ không giữ hẳn field. Ký hiệu nét đứt ⇢. Nhẹ hơn association.", "Hỏi đường người lạ xong đường ai nấy đi."],
    "multiplicity": ["Bội số ở hai đầu association: một instance lớp này ứng với BAO NHIÊU instance lớp kia (1, 0..1, 1..*, *). Dịch thẳng thành field đơn hay List trong code.", "Một 'Nhà' có 1..* 'Người'; một 'Người' thuộc 1 'Nhà'."],
    "navigability": ["Chiều 'đi được' từ object này tới object kia qua association (mũi tên). Chỉ nên giữ chiều THẬT SỰ cần → quan hệ nhẹ, loose coupling.", "Đường một chiều vs hai chiều: chỉ mở chiều nào cần đi."],
    "role": ["Tên một đầu của association — vai lớp đó đóng trong quan hệ (vd Instructor, Prerequisites).", "Trong quan hệ 'dạy học': một bên là 'giáo viên', bên kia 'học sinh'."],
    "Generalization (Inheritance)": ["Quan hệ 'is a kind of': subclass kế thừa cấu trúc/hành vi của superclass, định nghĩa hệ thứ bậc trừu tượng. Ký hiệu tam giác rỗng △. Single/Multiple inheritance.", "Xe điện △ Xe: con là một loại đặc biệt của cha."],
    "State Machine": ["Đồ thị có hướng gồm state (node) nối bởi transition (cung), mô tả lịch sử đời của một reactive object. Transition: Event(args)[guard]/activity. Chỉ vẽ cho object 'có tính khí' (phản ứng khác nhau tùy state).", "Đèn giao thông: Xanh→Vàng→Đỏ, mỗi lần đổi do một tín hiệu."],
    "state": ["Một tình huống ổn định object đang ở (vd CourseInfo: Opened nếu ≥3 SV, Closed nếu <3). Thường biểu diễn bằng một attribute.", "Tâm trạng hiện tại của object tại một thời điểm."],
    "event": ["Điều xảy ra kích hoạt một transition (thường từ một operation trong interface, vd addLecturer).", "Cú hích làm object đổi trạng thái (bấm nút, hết giờ…)."],
    "transition": ["Đường chuyển từ state này sang state khác khi nhận event (có thể kèm guard & activity).", "Mũi tên nối hai trạng thái: gặp tín hiệu thì nhảy sang."],
    "guard": ["Điều kiện [trong ngoặc vuông] phải đúng thì transition mới xảy ra: Event[guard]/activity.", "Cái chốt: 'chỉ đổi nếu điều kiện này đúng'."],
    "pseudo-state": ["Trạng thái GIẢ (không phải state thật): Initial state (● khi tạo object, bắt buộc, chỉ 1), Choice, Final state (kết thúc đời object, tùy chọn, có thể nhiều).", "Vạch xuất phát ● và đích của đường đua — không phải chặng nghỉ."],
    "attribute": ["Dữ liệu lớp NHỚ: attributeName: Type = Default (+ visibility). Type phải là kiểu sơ cấp (elementary) của ngôn ngữ. Tìm từ 'danh từ' có giá trị nhưng không có hành vi.", "Các ô trong tờ khai lý lịch của object."],
    "Derived Attribute": ["Attribute mà giá trị được TÍNH từ attribute khác, không lưu độc lập (ký hiệu / phía trước, vd /tuổi). Chỉ 'lưu sẵn' khi tính lại quá tốn — đánh đổi tốc độ ↔ bộ nhớ.", "'Tuổi' suy từ 'ngày sinh' — khỏi lưu, cần thì tính."],

    /* ---------- Chương 8: Data Modeling ---------- */
    "Data Modeling": ["Trừu tượng hóa & tổ chức cấu trúc thông tin thế giới thực (object) để đưa vào database. Luồng: Real world → Data model → Database. Có 3 mức: conceptual/logical/physical.", "Nghề 'phiên dịch' thế giới đối tượng sang thế giới bảng biểu."],
    "conceptual": ["Mức data model KHÁI NIỆM: dữ liệu ở mức ý tưởng, ĐỘC LẬP DBMS (vd E-R diagram). Không ràng buộc công nghệ.", "Bản phác ý trên giấy ăn — chỉ nêu ý chính."],
    "logical": ["Mức data model LOGIC: đã chọn kiểu CSDL (relational/network/hierarchical) — phụ thuộc DBMS, nhưng chưa cài thật.", "Bản vẽ kỹ thuật — đầy đủ nhưng chưa thi công."],
    "physical": ["Mức data model VẬT LÝ: logical đã được CÀI xuống một DBMS thật (data manipulation, index…).", "Ngôi nhà đã xây theo đúng vật liệu thật."],
    "ER diagram": ["Entity–Relationship diagram — sơ đồ dữ liệu ở mức conceptual, gồm 3 phần tử: Entities · Relationships · Attributes. Còn gọi E-R model.", "Sơ đồ họ hàng của dữ liệu: ai là ai, nối với ai."],
    "entity": ["Một loại đối tượng có dữ liệu cần lưu (Sinh viên, Môn học). Khi thiết kế physical DB → thành Table (cột = attribute, hàng = giá trị).", "Một loại hồ sơ trong kho dữ liệu."],
    "relationship": ["Mối liên hệ giữa các entity (vd Sinh viên ĐĂNG KÝ Môn học), có cardinality 1:1/1:n/m:n.", "Sợi dây nối hai loại hồ sơ."],
    "cardinality": ["Số lượng ở hai đầu relationship: one-to-one (1:1), one-to-many (1:m), many-to-one (m:1), many-to-many (m:n). Tương đương multiplicity ở Chương 7.", "'Một cái này ứng với mấy cái kia'."],
    "many-to-many": ["Quan hệ m:n — hai bên đều 'nhiều'. Bảng phẳng không chứa trực tiếp được → phải TÁCH bằng một entity/bảng trung gian chứa 2 FK.", "Nhiều sinh viên ↔ nhiều môn học: phải đẻ bảng 'đăng ký' ở giữa."],
    "hierarchical": ["Logical data model kiểu CÂY: parent–child là 1:n, mỗi con đúng một cha. Cứng nhắc.", "Cây gia phả: mỗi con chỉ có một cha."],
    "network": ["Logical data model kiểu MẠNG: parent–child m:n, con có nhiều cha (CODASYL). Rối.", "Mạng lưới bạn bè: ai cũng nối được với nhiều người."],
    "relational": ["Logical data model kiểu BẢNG 2 chiều (row = record, column = item, cột gạch chân = primary key), nối nhau bằng khóa. Kiểu thống trị ngày nay.", "Mấy cái bảng Excel nối nhau bằng mã chung."],
    "NoSQL": ["Nhóm CSDL 'không bảng cứng' (document, non-relational), schema-free, tối ưu append/retrieve & scalability. Một entity = một document (khác relational trải trên nhiều bảng).", "Ngăn kéo tự do nhét gì cũng được, không bắt theo mẫu bảng."],
    "schema": ["Mô tả khung của một CSDL. Three-layer: External schema (góc nhìn user), Conceptual schema, Internal schema.", "Bản thiết kế khung của kho dữ liệu."],
    "Object Model": ["Cách nhìn hướng đối tượng: Classes (attributes) + Relationships (association, generalization); TẬP TRUNG HÀNH VI và GIẤU dữ liệu (encapsulation).", "Người kín đáo chỉ cho xem 'tôi làm được gì'."],
    "Relational Data Model": ["Cách nhìn quan hệ: Entities → Table, Relations → Relationship; TẬP TRUNG DỮ LIỆU và PHƠI nó ra (expose column values). Lệch pha với Object Model.", "Bảng tin công khai dán hết thông tin ra."],
    "persistent class": ["Lớp cần LƯU LÂU DÀI vào CSDL (dữ liệu không mất khi tắt máy) → được map thành Entity/Table khi ánh xạ class → ER.", "Loại hồ sơ 'phải cất tủ', khác ghi chú nháp bỏ đi."],
    "primary key": ["Cột định danh DUY NHẤT mỗi hàng trong bảng (PK). Trong relational vẽ gạch chân.", "Số CMND của mỗi bản ghi — không ai trùng ai."],
    "foreign key": ["Cột trỏ tới primary key của bảng khác để tạo quan hệ (FK). Association → FK; nếu FK KHÔNG nằm trong PK → independency, nếu NẰM TRONG → dependency.", "Ghi 'mã lớp' trong hồ sơ học sinh để biết em thuộc lớp nào."],
    "FK": ["Foreign Key — khóa ngoại, cột trỏ sang PK bảng khác. Cách ánh xạ association/aggregation sang quan hệ CSDL.", "Đường link nối một bảng tới bảng khác."],
    "Dependency relationship": ["Trong ER: entity con CHỈ tồn tại khi cha tồn tại; FK NẰM TRONG PK của con; vẽ đường LIỀN. (vd HoaDon → ChiTietHD).", "'Chi tiết hóa đơn' vô nghĩa nếu không có 'Hóa đơn' mẹ — liền = dính chặt."],
    "Independency relationship": ["Trong ER: entity con TỒN TẠI ĐƯỢC dù cha không; FK KHÔNG nằm trong PK con; vẽ NÉT ĐỨT. (vd KhachHang → HoaDon).", "'Hóa đơn' vẫn còn kể cả xóa 'Khách hàng' — đứt = lỏng lẻo."],
    "Inheritance": ["Kế thừa (cha–con). CSDL quan hệ KHÔNG hỗ trợ trực tiếp → 2 cách map: bảng riêng cha–con (normalized) hoặc chép hết cột cha xuống con (de-normalized).", "Con thừa hưởng nét cha mẹ — nhưng 'bảng' không hiểu, phải né."],
    "normalized": ["Cách map inheritance: tách bảng cha & bảng con RIÊNG, nối bằng khóa. Gọn, không trùng, nhưng truy vấn phải join nhiều bảng.", "Để đồ dùng chung ở một tủ: đỡ tốn chỗ, nhưng phải đi lấy."],
    "de-normalized": ["Cách map inheritance: CHÉP mọi cột của cha xuống mỗi bảng con (replication). Truy vấn nhanh (khỏi join) nhưng dữ liệu lặp, dễ mâu thuẫn.", "Mỗi phòng sắm một bộ riêng: tiện nhưng tốn & dễ lệch."],
    "Normalization": ["Chuẩn hóa — quy trình từng bước LOẠI dư thừa (redundancy) khỏi thiết kế DB, để mỗi thông tin nằm đúng MỘT chỗ (cải thiện storage/integrity/scalability). Đi qua 1NF→2NF→3NF. Do Edgar F. Codd đề xuất.", "Dọn tủ: mỗi thứ để đúng một chỗ, khỏi ba nơi cùng giữ dễ lệch."],
    "Functional Dependency": ["X → Y: tập cột X XÁC ĐỊNH cột Y nếu mỗi giá trị X ứng với TỐI ĐA một giá trị Y. Khái niệm chìa khóa để hiểu 2NF/3NF.", "Biết mã số thuế là suy ra đúng một tên công ty — X quyết định Y."],
    "1NF": ["Chuẩn 1: mọi giá trị đều NGUYÊN TỬ (atomic) — mỗi ô một giá trị, không nhóm lặp.", "Mỗi ô một món, không nhét cả xâu vào một ô."],
    "2NF": ["Chuẩn 2: đạt 1NF + KHÔNG có partial dependency — non-key attribute không phụ thuộc MỘT PHẦN của khóa chính (chỉ xảy ra khi PK gồm nhiều cột).", "Cột phải phụ thuộc TOÀN BỘ khóa, không phải một nửa."],
    "3NF": ["Chuẩn 3: đạt 2NF + KHÔNG có transitive dependency — non-key không phụ thuộc bắc cầu vào PK (kiểu Order→Customer→Address). Đủ cho hầu hết ứng dụng.", "'Phụ thuộc vào khóa, toàn bộ khóa, và không gì ngoài khóa'."],
    "partial dependency": ["Phụ thuộc BỘ PHẬN: một cột non-key chỉ phụ thuộc một phần của khóa chính nhiều cột. 2NF loại bỏ nó.", "Món trong ô chỉ dựa vào 'nửa cái khóa'."],
    "transitive dependency": ["Phụ thuộc BẮC CẦU: non-key phụ thuộc PK gián tiếp qua một cột non-key khác (A→B→C). 3NF loại bỏ nó.", "Order→Customer→Address: địa chỉ dựa vào khách chứ không dựa thẳng vào đơn."],
    "BCNF": ["Boyce-Codd Normal Form — dạng chuẩn chặt hơn 3NF một chút; đa số bảng đạt 3NF cũng đạt BCNF.", "Bản '3NF nâng cấp', hiếm khi cần lo thêm."],

    /* ---------- Chương 9: Testing ---------- */
    "testing": ["Thực thi chương trình để xác định một property của nó ĐÚNG hay không; test PASS nếu property holds, FAIL nếu không. Chỉ CHỨNG MINH ĐƯỢC có lỗi, không chứng minh hết lỗi.", "Xét nghiệm: dương tính khẳng định có bệnh, âm tính không đảm bảo hoàn toàn khỏe."],
    "QA": ["Quality Assurance — đảm bảo chất lượng, RỘNG hơn testing: gồm static analysis, code review, proofs of correctness, cải tiến quy trình… 'Không hoạt động đơn lẻ nào đảm bảo chất lượng'.", "Xây chất lượng từ gốc, không chỉ nếm thử ở cuối."],
    "V-Model": ["Mô hình chữ V: mỗi mức thiết kế (nhánh trái) ghép với một mức test tương ứng (nhánh phải).", "Soi gương: thiết kế bên này có bài kiểm tra tương ứng bên kia."],
    "Unit": ["Mức test nhỏ nhất: kiểm từng unit (class, method) LÀM ĐÚNG VIỆC của nó, cô lập. Dùng cả black & white box.", "Kiểm từng viên gạch trước khi xây tường."],
    "Integration": ["Mức test GHÉP các phần lại và kiểm chỗ NỐI giữa chúng có ra kết quả mong đợi. Chiến lược: top-down, bottom-up, big-bang, sandwich.", "Thử xem các viên gạch dính vữa với nhau có chắc không."],
    "System": ["Mức test toàn bộ phần mềm như một khối hoàn chỉnh.", "Chạy thử cả chiếc xe đã lắp xong."],
    "Acceptance": ["Mức test khách hàng kiểm xem có KHỚP NHU CẦU để nghiệm thu.", "Khách lái thử và gật đầu 'đúng xe tôi đặt'."],
    "test case": ["Tập điều kiện/biến để xác định SUT có thỏa một yêu cầu; định nghĩa input + expected outcome (soict). Mỗi scenario/nhánh → một test case.", "Một câu hỏi kiểm tra kèm đáp án đúng."],
    "test suite": ["Tập các test case liên quan chạy chung (JUnit gom bằng @RunWith(Suite.class)).", "Tập đề thi chạy tất cả trong một lần bấm nút."],
    "test plan": ["Tài liệu mô tả approach, methodology, rủi ro, phạm vi, công cụ test. = Test Strategy (What/Why/When) + Test Logistics (Who).", "Kế hoạch tổng cho việc kiểm thử: làm gì, ai làm, khi nào."],
    "SUT": ["System/Software Under Test — phần mềm/đơn vị đang được kiểm thử.", "'Bị cáo' đang được đưa ra kiểm tra."],
    "Black-box": ["Kiểm thử HỘP ĐEN: chọn input dựa SPEC/hành vi (pre/postcondition), KHÔNG nhìn code; cần soict (kết quả kỳ vọng). Kỹ thuật: equivalence, boundary-value, decision table, use-case.", "Thử máy bán nước: bấm nút xem ra đúng lon không, mặc kệ ruột máy."],
    "White-box": ["Kiểm thử HỘP TRẮNG: chọn input dựa CẤU TRÚC CODE, đo bằng coverage (C0/C1). Nếu test không chạy qua một statement → statement đó có thể lỗi.", "Thợ mở nắp máy, đi theo từng đường dây để chắc chỗ nào cũng chạy."],
    "Equivalence Partitioning": ["Kỹ thuật black-box: chia không gian input thành các LỚP TƯƠNG ĐƯƠNG cho cùng kết quả, mỗi lớp chỉ thử 1 đại diện. PHẢI thêm cả lớp input KHÔNG hợp lệ.", "Kiểm 'đủ 18 tuổi': chỉ cần một người <18 và một người ≥18, không thử mọi số tuổi."],
    "Boundary-value": ["Kỹ thuật black-box: lấy test data ngay tại BIÊN của mỗi lớp tương đương — vì bug hay nấp ở đó (lập trình viên hay nhầm > với >=). 'Bạn thân' của equivalence partitioning.", "Ngưỡng đỗ 70: thử 69 và 70 (hai bên lằn ranh), đừng thử 50 hay 90."],
    "Decision Table": ["Kỹ thuật black-box: bảng liệt kê mọi TỔ HỢP điều kiện (Y/N) → hành động tương ứng, để không sót ca nào khi nhiều điều kiện đan xen.", "Bảng 'nếu–thì' của bảo hiểm: mỗi tổ hợp một mức phí."],
    "Use-case testing": ["Kỹ thuật black-box: sinh test từ các SCENARIO của use case — mỗi luồng (basic + alternative) thành một test case. 'Thu hoạch' công viết use case ở Chương 3.", "Diễn lại từng kịch bản người dùng để xem có vấp ở đâu."],
    "coverage": ["Độ phủ — tỷ lệ cấu trúc code (statement/branch) đã được test chạy qua; thước đo của white-box. 100% vẫn không phát hiện được chức năng QUÊN chưa viết.", "Phần trăm căn nhà đã được quét dọn."],
    "C0": ["Statement coverage — độ phủ CÂU LỆNH: (số statement đã chạy)/(tổng statement); 100% = mọi câu lệnh được thực thi ít nhất một lần.", "Đòi 'giẫm chân lên mọi ô' của mê cung."],
    "C1": ["Branch coverage — độ phủ NHÁNH: (số nhánh đã đi)/(tổng nhánh); 100% = mọi nhánh (cả true & false của mỗi điều kiện) được đi qua. MẠNH hơn C0.", "Đòi 'đi qua mọi ngã rẽ' của mê cung."],
    "loop testing": ["Kiểm thử vòng lặp bằng tư duy boundary-value trên SỐ LẦN LẶP: skip (0 lần) · 1 lần · m lần điển hình · n-1 · n · n+1(invalid).", "Thử thang máy: 0 người, 1, đông vừa, gần đầy, đầy, quá tải."],
    "JUnit": ["Framework viết & chạy test tự động cho Java (test-driven development), tích hợp IDE. Mỗi test là method @Test dùng assert; setUp/tearDown dựng/dọn test fixture; TestRunner báo Failure/Error.", "Dàn máy chấm bài trắc nghiệm: nạp đáp án, tự tô đỏ câu sai."],
    "TestCase": ["Kiểu cổ điển của JUnit: lớp kế thừa junit.framework.TestCase, method testXxx() theo programming by contract (set up precondition → chạy → kiểm postcondition).", "Tờ đề thi gom các câu kiểm tra cho một phần code."],
    "assert": ["Câu lệnh khẳng định kết quả mong đợi (assertEquals, assertTrue, assertSame…); sai thì test FAIL. Nên kèm message; nên tiết kiệm (assert đầu fail sẽ dừng).", "Câu 'đáng lẽ phải bằng…' — sai là báo trượt ngay."],
    "setUp": ["Method JUnit chạy TRƯỚC mỗi test để dựng test fixture → mỗi test bắt đầu với đối tượng 'mới tinh', độc lập thứ tự.", "Bày bàn sạch trước mỗi lượt kiểm tra."],
    "tearDown": ["Method JUnit chạy SAU mỗi test để giải phóng test fixture.", "Dọn bàn sau mỗi lượt kiểm tra."],
    "@Test": ["Annotation JUnit 4 đánh dấu một method là test để tự chạy; @Test(expected=...) để mong đợi exception.", "Nhãn 'đây là câu hỏi thi' cho máy biết mà chấm."],
    "test fixture": ["Bộ dữ liệu/đối tượng chuẩn bị cho test, dựng ở setUp và dọn ở tearDown, giúp mỗi test độc lập.", "Bộ 'đạo cụ' bày sẵn cho mỗi màn kiểm tra."],
    "Failure": ["Trong JUnit: test CHẠY XONG nhưng kết quả sai kỳ vọng (assert/oracle thất bại).", "Thí sinh khoanh SAI đáp án."],
    "Error": ["Trong JUnit: có sự cố NGOÀI dự kiến làm code văng exception (vd null pointer), chưa kịp so đáp án.", "Tờ bài rách giữa chừng, không chấm được."],
    "stub": ["Chương trình GIẢ thay cho module CẤP THẤP chưa có (trả một giá trị cứng) để test module trên; đơn giản.", "Diễn viên đóng thế đứng vào cho đủ cảnh quay phần chính."],
    "driver": ["Chương trình GIẢ thay cho module CẤP CAO chưa có (gọi xuống module đang test); phức tạp hơn stub vì có điều khiển.", "Người điều khiển tạm bấm thử thiết bị khi bảng điều khiển thật chưa xong."],
    "Top-down": ["Chiến lược integration từ TRÊN xuống: ghép module cấp cao trước, dùng STUB cho cấp dưới; phát hiện sớm lỗi hiểu sai spec.", "Xây (trên giấy) từ nóc xuống: lắp khung tổng trước, chi tiết sau."],
    "Bottom-up": ["Chiến lược integration từ DƯỚI lên: ghép module cấp thấp trước, dùng DRIVER; test song song được, tốt khi sửa hệ có sẵn.", "Xây từ móng lên: chắc từng viên gạch rồi mới lắp cao."],
    "Big-bang": ["Chiến lược integration: ghép TẤT CẢ module (đã unit-test) cùng lúc rồi mới test; nhanh với hệ nhỏ nhưng KHÓ định vị lỗi.", "Đổ hết nguyên liệu vào nồi một lúc: dở thì chẳng biết tại món nào."],
    "Sandwich": ["Chiến lược integration kết hợp: cấp thấp test bottom-up, cấp cao test top-down, gặp nhau ở giữa.", "Xây đồng thời từ nóc xuống và từ móng lên, khớp ở tầng giữa."],
    "Regression Test": ["Chạy LẠI test case cũ sau khi code đổi, để chắc KHÔNG làm hỏng thứ đang chạy ('sửa 1 bug tạo vài bug mới'). Nên tự động hóa & chạy càng thường xuyên càng tốt.", "Sửa vòi bếp xong đi kiểm luôn vòi tắm xem có rò theo không."],

    /* ---------- Chương 10: Programming ---------- */
    "Debugging": ["Gỡ lỗi — XÁC ĐỊNH VỊ TRÍ + NGUYÊN NHÂN của lỗi đã lộ, khác Test (chỉ tiết lộ có lỗi). Là biện pháp CUỐI CÙNG trong defense in depth; nên làm theo phương pháp khoa học.", "Bác sĩ chẩn bệnh cho code: tìm đúng chỗ đau rồi chữa."],
    "Defensive programming": ["Lập trình với tinh thần validation & debugging sẵn trong đầu — luôn giả định điều tệ có thể xảy ra.", "Lái xe phòng thủ: luôn đề phòng bất trắc."],
    "coding convention": ["Bộ quy tắc chung về đặt tên, hằng số, comment, trình bày để code ai viết cũng đọc như một người; kiểm bằng Checkstyle.", "Luật chính tả của cả nhóm."],
    "code tuning": ["Sửa code ĐÚNG để chạy hiệu quả hơn — nhưng thông điệp chính là ĐỪNG làm sớm. Quy tắc 80/20 (20% code ngốn 80% thời gian); 'Make it right, then make it fast'; phải ĐO.", "Độ xe cho nhanh: chỉ độ khi đã đo biết chỗ nào chậm."],
    "optimization": ["Tối ưu — cải thiện performance; 'tối ưu sớm là gốc rễ mọi tội lỗi' (Knuth). Phải Measure, tối ưu theo vòng lặp, không cải thiện thì revert.", "Đừng kê thuốc bừa — chẩn đoán (đo) rồi mới bốc thuốc."],
    "Refactoring": ["Cải thiện thiết kế & chất lượng mã hiện có MÀ KHÔNG đổi hành vi bên ngoài (Martin Fowler); quy trình từng bước biến bad code → good code, dựa refactoring patterns. Unit test làm lưới an toàn.", "Dọn dẹp & sắp lại căn phòng: đồ vẫn đủ, công năng không đổi, chỉ dễ dùng hơn."],
    "code smell": ["Cấu trúc trong code GỢI Ý khả năng cần refactoring (chưa chắc là lỗi). Gom thành 6 nhóm: Bloaters, Obfuscators, OO Abusers, Change Preventers, Dispensables, Couplers.", "Mùi lạ trong bếp: chưa cháy nhưng nên đi kiểm tra."],
    "Bloaters": ["Nhóm code smell 'PHÌNH TO': Long method, Large class, Long parameter list, Primitive obsession, Data clumps… → vi phạm 'làm một việc'.", "Vali nhồi quá tải — cần chia nhỏ."],
    "Obfuscators": ["Nhóm code smell làm KHÓ HIỂU: Poor names, Comments thừa (nên nói WHY không WHAT), Inconsistency (POLA), Obscured intent.", "Chữ viết ngoáy — đọc mà đoán mãi không ra."],
    "OO Abusers": ["Nhóm code smell DÙNG SAI hướng đối tượng: Switch statement (nên polymorphism), Temporary field, Class depends on subclass (phá Liskov), Inappropriate static.", "Có xe mà cứ đẩy bộ — công cụ tốt dùng sai cách."],
    "Change Preventers": ["Nhóm code smell khiến MỘT thay đổi phải sửa NHIỀU nơi: Divergent change (phá SRP), Shotgun surgery, Conditional complexity.", "Đổi số điện thoại mà phải sửa ở chục cuốn sổ."],
    "Dispensables": ["Nhóm code smell THỪA THÃI nên bỏ: Dead code, Duplicated code (phá DRY), Lazy class, Data class, Speculative generality (YAGNI).", "Đồ cũ không dùng chất đầy nhà — vứt cho gọn."],
    "Couplers": ["Nhóm code smell gây PHỤ THUỘC quá chặt: Feature envy, Inappropriate intimacy, vi phạm Law of Demeter, Message chains, Middle man. Đúng chủ đề Chương 11.", "Hai món dính chặt: gỡ một cái kéo theo cái kia."],
    "KISS": ["Keep It Simple, Stupid — ưu tiên giải pháp ĐƠN GIẢN nhất chạy được; kim chỉ nam của refactoring & thiết kế.", "Đừng dùng dao mổ trâu giết gà."],
    "DRY": ["Don't Repeat Yourself — mỗi mẩu kiến thức chỉ nên viết MỘT nơi; thấy code lặp là gom lại. (Duplicated code vi phạm DRY.)", "Số điện thoại chỉ lưu một chỗ; đổi thì sửa đúng chỗ đó."],
    "Boy Scout Rule": ["Nguyên tắc: rời code để lại SẠCH HƠN lúc bạn đến — mỗi lần đụng vào thì dọn giúp một chút.", "Dọn thêm chút rác mỗi lần rời công viên."],
    "technical debt": ["'Nợ kỹ thuật' — code làm vội/ẩu để lại, phải 'trả lãi' bằng việc sửa sau; một tín hiệu cần refactor.", "Vay nóng: tiện lúc này nhưng phải trả lãi về sau."],
    "fail-fast": ["Nguyên tắc: thà LỖI NGAY và rõ (dùng assertion) còn hơn chạy tiếp với dữ liệu sai rồi hỏng âm thầm ở nơi xa. Tầng 3 của defense in depth.", "Đèn 'check engine' sáng ngay khi máy chớm hỏng, đừng đợi chết máy giữa đèo."],
    "defense in depth": ["Chiến lược phòng lỗi NHIỀU TẦNG theo thứ tự ưu tiên: (1) Make errors impossible → (2) Don't introduce defects → (3) Make errors immediately visible (fail-fast) → (4) Debugging (last resort).", "Phòng cháy: thiết kế chống cháy > báo khói sớm > chữa cháy (hạ sách)."],
    "binary search": ["Kỹ thuật debug: kiểm kết quả ở 'điểm giữa' đường đi của lỗi để cắt đôi phạm vi nghi ngờ mỗi lần → định vị lỗi trong O(log n).", "Tìm đoạn ống rò: kiểm ở giữa, khô thì rò nửa kia, vài lần là ra."],
    "Heisenbug": ["Lỗi 'ma' cứ soi/đo (bật debugger, thêm dòng in) là biến mất — do timing/concurrency. Đối phó: logging (circular buffer), minimize input, nghi lỗi ngớ ngẩn trước.", "Tiếng kêu lạ trong xe: mang ra thợ thì im, về nhà lại kêu."],
    "Checkstyle": ["Công cụ (Eclipse plug-in) tự kiểm code có theo đúng coding convention/coding standard không.", "Giám thị chính tả tự động soi lỗi trình bày."],
    "FindBugs": ["Công cụ static analysis tìm bug & vấn đề performance trong file .class Java (>200 rule, dùng 'bug patterns'), không cần chạy code.", "Máy soi phát hiện vết nứt trong code trước khi nó gây tai nạn."],
    "static analysis": ["Phân tích code MÀ KHÔNG CHẠY nó để tìm lỗi tiềm ẩn (một phần của QA; công cụ như FindBugs).", "Soi bản vẽ tìm lỗi mà chưa cần thi công."],

    /* ---------- Chương 11: Coupling & Cohesion ---------- */
    "module": ["Thuật ngữ chung cho một đơn vị thiết kế (class, type, package…). Modular design lo module nào được định nghĩa, đặc tả & quan hệ ra sao — không lo cài đặt bên trong.", "Một viên Lego: tự nó là một khối, ghép được vào nhiều chỗ."],
    "Modular design": ["Nghệ thuật chia hệ thống thành module & sắp quan hệ giữa chúng cho khéo; lý tưởng: decomposable, composable, understandable, continuity, isolation.", "Chia hệ thống thành các khối Lego tháo lắp được."],
    "Coupling": ["Mức một module PHỤ THUỘC vào module khác — cần THẤP (loose). High coupling khiến đổi 1 component ảnh hưởng mọi component nối với nó. Có thang 6 bậc từ tệ→tốt.", "Dây nối giữa hai hộp: càng ít dây, tháo lắp & sửa càng dễ."],
    "Cohesion": ["Mức MỌI phần tử trong một module cùng hướng về MỘT nhiệm vụ — cần CAO (high). 'Internal glue'; lý do phổ biến để gom = tạo một ADT. Có thang 8 bậc từ tốt→tệ.", "Ngăn kéo 'chỉ đựng dao kéo': mở ra biết ngay tìm gì."],
    "content coupling": ["Coupling TỆ NHẤT: component này tham chiếu/SỬA THẲNG nội dung bên trong component khác (sửa data, nhảy vào giữa routine).", "Lén vào nhà hàng xóm xê dịch đồ đạc."],
    "common coupling": ["Coupling xấu: nhiều component CHIA SẺ dữ liệu toàn cục (global/common block) — thiếu trách nhiệm rõ, khó bảo trì/kiểm soát.", "Cả xóm ghi lên một bảng chung: một người xóa là loạn."],
    "control coupling": ["Coupling trung bình: component TRUYỀN CỜ điều khiển bắt component kia rẽ nhánh. Xấu nếu phải biết logic bên trong; tạm được nếu giúp factoring.", "Đưa mảnh giấy 'làm kiểu 2' — bên kia phải biết 'kiểu 2' là gì."],
    "stamp coupling": ["Coupling trung bình: truyền CẢ cấu trúc dữ liệu cho component chỉ dùng một phần (phải biết cách thao tác cấu trúc → biết cài đặt).", "Đưa cả hồ sơ dày chỉ để người ta xem mỗi cái tên."],
    "data coupling": ["Coupling TỐT: chỉ truyền đúng vài dữ liệu ĐƠN GIẢN cần thiết qua tham số → dễ viết contract & sửa độc lập.", "Đưa đúng một tờ note ghi mỗi thứ cần — gọn và rõ."],
    "functional cohesion": ["Cohesion TỐT NHẤT: mọi phần tử thiết yếu cho MỘT phép tính đơn.", "Máy xay chỉ để xay — một chức năng duy nhất, rõ ràng."],
    "informational cohesion": ["Cohesion tốt: module nhiều action, mỗi action có entry/code riêng nhưng đều trên CÙNG dữ liệu (ADT & OO thúc đẩy).", "Một cái tủ có nhiều ngăn thao tác nhưng cùng phục vụ một loại đồ."],
    "sequential cohesion": ["Cohesion tốt: output của phần này là input phần kia (tự nhiên trong lập trình hàm).", "Dây chuyền: đầu ra khâu này là đầu vào khâu sau."],
    "communicational cohesion": ["Cohesion trung bình: chuỗi action theo trình tự, tất cả thao tác trên CÙNG dữ liệu.", "Mấy việc khác nhau nhưng cùng đụng vào một hồ sơ."],
    "procedural cohesion": ["Cohesion trung bình: các phần tử liên quan chỉ để ĐẢM BẢO THỨ TỰ thực thi. Liên kết yếu, khó tái sử dụng.", "Gom vì 'phải làm theo thứ tự này', không vì cùng mục đích."],
    "temporal cohesion": ["Cohesion yếu: phần tử liên quan bởi THỜI ĐIỂM (vd routine khởi tạo hệ thống). Khó đổi, dễ regression.", "Ngăn 'mấy thứ cùng làm lúc bật máy' — chẳng liên quan gì nhau."],
    "logical cohesion": ["Cohesion yếu: phần tử liên quan về mặt LOGIC không phải chức năng; client chọn một phần tử (vd đọc input từ tape/disk/network cùng module).", "Gom vì 'cùng loại thao tác', client phải chọn nhánh."],
    "coincidental cohesion": ["Cohesion TỆ NHẤT: phần tử chỉ liên quan bởi VỊ TRÍ trong source code (tình cờ nằm cạnh nhau).", "Ngăn kéo 'linh tinh' nhét pin, kẹo, chìa khóa — chẳng theo lý gì."],
    "Law of Demeter": ["Quy tắc (Karl Lieberherr): một object nên biết CÀNG ÍT CÀNG TỐT về cấu trúc bên trong object khác — 'chỉ nói chuyện với bạn thân trực tiếp'. Tránh chuỗi a.getB().getC().getD().", "Muốn trả tiền thì đưa ví cho thu ngân, đừng tự thò tay vào túi họ."],
    "God class": ["Anti-pattern: một lớp ÔM quá nhiều data/chức năng — cohesion thảm hại. 'Gian lận' giảm coupling bằng cách nuốt mọi module thành một → mất cân bằng.", "Một người ôm hết mọi việc công ty: nghỉ một hôm là loạn cả."],
    "anti-pattern": ["Một cách làm DỞ đã được đặt tên để mọi người nhận biết & tránh (vd God class).", "Cái bẫy có biển báo — thấy là né."],
    "loose coupling": ["Mục tiêu thiết kế: các module ít phụ thuộc nhau → đổi cái này không phải đụng cái kia. Nửa của câu thần chú 'loose coupling, high cohesion'.", "Đồ lắp kiểu tháo rời được: đổi món này khỏi động món kia."],
    "high cohesion": ["Mục tiêu thiết kế: mỗi module tập trung làm MỘT việc rõ ràng. Nửa kia của câu thần chú; chính là tinh thần SRP.", "Mỗi phòng ban chỉ lo đúng phần việc của mình."],
    "Information hiding": ["Che giấu quyết định thiết kế có thể đổi (= encapsulation + creation + binding time) — một key design concept để giảm coupling.", "Giấu ruột đi, chỉ lộ mặt tiền — đổi ruột không ai hay."],
    "separation of concerns": ["Nguyên tắc: một module chỉ nên giải quyết MỘT tập concern (mối quan tâm) — nền của high cohesion & SRP.", "Việc ai nấy lo, đừng ôm chuyện của người khác."],

    /* ---------- Chương 12: SOLID ---------- */
    "SOLID": ["5 nguyên lý thiết kế OO của Robert C. Martin để quản lý dependency & chẩn đoán thiết kế: SRP, OCP, LSP, ISP, DIP. Gần như đều xoay quanh 'phụ thuộc vào abstraction'.", "5 lời khuyên vàng để code coupling thấp, cohesion cao, dễ thay đổi."],
    "SRP": ["Single Responsibility Principle — mỗi lớp chỉ nên có ĐÚNG MỘT lý do để thay đổi (một loại trách nhiệm). Chính là 'high cohesion' đóng chai. Vi phạm → thiết kế mong manh (fragile).", "Con dao Thụy Sĩ tiện nhưng hỏng cái mở nút chai phải thay cả con — nên tách bộ dao chuyên dụng."],
    "Single Responsibility Principle": ["Nguyên lý S của SOLID: một lớp = một trách nhiệm = một lý do để sửa. Đo bằng cohesion.", "Mỗi công cụ làm tốt một việc."],
    "OCP": ["Open-Closed Principle (Bertrand Meyer) — MỞ cho mở rộng, ĐÓNG với sửa đổi: thêm hành vi mới bằng cách viết code mới (lớp con) chứ không sửa code đã chạy tốt. 'Chìa khóa là abstraction'.", "Ổ cắm điện: cắm thêm thiết bị mới, khỏi đục tường nối lại dây."],
    "Open-Closed Principle": ["Nguyên lý O của SOLID: software entity nên open for extension, closed for modification. Dấu hiệu vi phạm: chuỗi if(type==A)... → chữa bằng polymorphism.", "Thêm mới đừng đụng cũ."],
    "LSP": ["Liskov Substitution Principle — ở đâu dùng lớp CHA thì phải nhét lớp CON vào mà không trục trặc; con 'demand no more, promise no less'. Là mở rộng của OCP. Vi phạm kinh điển: Ostrich–Bird, Rectangle–Square.", "Pin thay thế phải vừa khe VÀ đúng điện áp — cắm sai điện áp làm hỏng máy."],
    "Liskov Substitution Principle": ["Nguyên lý L của SOLID: lớp con phải THAY THẾ ĐƯỢC lớp cha mà không gây hành vi lạ; mọi cài đặt interface phải tuân thủ đầy đủ interface đó.", "Đồ thay thế chính hãng: lắp vào chạy y bản gốc, không giở chứng."],
    "ISP": ["Interface Segregation Principle — đừng bắt client phụ thuộc method họ KHÔNG dùng; chẻ 'fat interface' thành nhiều interface nhỏ chuyên biệt. Là SRP áp cho interface.", "Thà nhiều menu nhỏ (chay, đồ uống) còn hơn một cuốn 200 trang ai cũng phải lật."],
    "Interface Segregation Principle": ["Nguyên lý I của SOLID: nhiều interface chuyên biệt cho client tốt hơn một interface đa dụng — tránh coupling không cần giữa các client.", "Ai cần gì gọi menu nấy."],
    "DIP": ["Dependency Inversion Principle — cả module cấp cao lẫn cấp thấp đều phụ thuộc vào ABSTRACTION; cấp cao không phụ thuộc thẳng cấp thấp. 'Inversion': interface do tầng TRÊN sở hữu (ownership inversion). Linh hồn của thiết kế linh hoạt.", "Mỏ hàn cắm vào ổ điện qua phích chuẩn, không hàn cứng vào dây."],
    "Dependency Inversion Principle": ["Nguyên lý D của SOLID: 'Depend upon abstractions, not concretions'; high-level (ổn định) không phụ thuộc low-level (hay đổi), cả hai dựa abstraction.", "Dựa vào 'bản hợp đồng/interface', không vào 'người cụ thể'."],
    "abstraction": ["Trừu tượng hóa — chỉ giữ ý CHÍNH/chung (interface, abstract class), giấu chi tiết cài đặt. 'Chìa khóa' của OCP/DIP; là 'hinge point' nơi thiết kế cho phép cài đặt khác nhau.", "Nút 'Mở nhạc': bấm là được, khỏi cần biết loa hoạt động ra sao."],
    "concretion": ["Cài đặt CỤ THỂ (concrete class) — thứ hay thay đổi; DIP bảo đừng phụ thuộc thẳng vào nó mà vào abstraction.", "'Người cụ thể' — dễ đổi, đừng gắn cứng vào."],
    "polymorphism": ["Đa hình — nhiều lớp cùng một lời gọi nhưng mỗi lớp làm theo cách riêng; công cụ chính để đạt OCP. Dynamic (override, runtime) & Static (generics, compile-time).", "Cùng lệnh 'kêu đi': chó sủa, mèo meo — một lệnh, nhiều cách đáp."],
    "Dynamic Polymorphism": ["Đa hình lúc CHẠY: lớp con override method, gọi qua tham chiếu lớp cha (vd emps[i].printInfo()) → thêm loại mới không sửa code gọi. Cách hiện thực OCP.", "Bảo mọi con vật 'kêu đi', mỗi con tự kêu kiểu của nó."],
    "Static Polymorphism": ["Đa hình lúc BIÊN DỊCH: qua Generics (vd class LinkedList<E>) chứa object bất kỳ kiểu.", "Một cái hộp <E> đựng được mọi loại đồ, quyết ngay lúc khai báo."],
    "fat interface": ["Interface 'béo phì' ôm quá nhiều method cho nhiều client → đổi vì một client khiến mọi client recompile. ISP chữa bằng cách chẻ nhỏ.", "Hợp đồng bắt bạn ký cả điều khoản chẳng liên quan tới mình."],
    "Ownership Inversion": ["Trong DIP: interface do tầng TRÊN (client) sở hữu, tầng dưới phụ thuộc interface đó → đảo ngược chiều phụ thuộc thông thường.", "Khách đặt ra chuẩn ổ cắm, nhà cung cấp điện phải theo — không phải ngược lại."],
    "Dependency Injection": ["Kỹ thuật hiện thực DIP: 'tiêm' đối tượng cụ thể vào từ ngoài thay vì tự new bên trong ('new là glue').", "Đưa sẵn nguyên liệu vào bếp, thay vì bếp tự đi mua & gắn cứng nguồn."],

    /* ---------- Chương 13: Design Patterns ---------- */
    "Design Pattern": ["Một cặp 'VẤN ĐỀ thiết kế hay gặp ↔ GIẢI PHÁP mẫu' đã được đặt tên (Christopher Alexander); làm code linh hoạt hơn (giảm coupling) & là NGÔN NGỮ CHUNG của dân thiết kế. Mô tả bằng Name/Problem/Solution/Consequences.", "Thế cờ hay trong cờ vua mà kỳ thủ nào cũng nên thuộc."],
    "GoF": ["Gang of Four (Gamma, Helm, Johnson, Vlissides, 1994) — nhóm tác giả tổng hợp 23 design pattern; quy tắc: không gì thành pattern trừ khi có ≥3 ví dụ thực tế.", "Bộ tứ huyền thoại đặt nền cho các mẫu thiết kế."],
    "Gang of Four": ["4 tác giả cuốn 'Design Patterns' (1994) — chuẩn tham chiếu; chia pattern làm 3 nhóm Creational/Structural/Behavioral.", "Tứ đại cao thủ của làng design pattern."],
    "Creational": ["Nhóm pattern lo QUÁ TRÌNH KHỞI TẠO object cho linh hoạt: Factory Method, Abstract Factory, Singleton, Builder, Prototype.", "Nhóm lo khâu 'sinh ra' đối tượng cho khéo."],
    "Structural": ["Nhóm pattern lo CÁCH KẾT HỢP object/class thành cấu trúc lớn: Adapter, Bridge, Composite, Decorator, Façade, Flyweight, Proxy.", "Nhóm lo khâu 'lắp ráp' các mảnh với nhau."],
    "Behavioral": ["Nhóm pattern lo CÁCH GIAO TIẾP & phân việc giữa object: Observer, Strategy, Command, Iterator, State, Template Method, Visitor…", "Nhóm lo khâu 'ai làm gì, nói chuyện với ai'."],
    "Consequences": ["Phần mô tả pattern nêu KẾT QUẢ & TRADE-OFF (được gì, mất gì) — vì pattern nào cũng có cái giá.", "Đọc kỹ 'điều khoản đánh đổi' trước khi chọn công thức."],
    "Singleton": ["Pattern Creational: đảm bảo một lớp có CHÍNH XÁC MỘT instance & cung cấp điểm truy cập toàn cục. Hiện thực: constructor private + instance static + getInstance(). Có kiểu eager & lazy.", "Chức Tổng thống: chỉ có một, ai cần cũng gọi qua đúng một văn phòng."],
    "eager initialization": ["Kiểu Singleton tạo instance NGAY khi nạp lớp (final static). Đơn giản, an toàn đa luồng, nhưng tốn nếu chẳng dùng.", "Nấu sẵn cơm chờ khách, kể cả không ai ăn."],
    "lazy initialization": ["Kiểu Singleton chỉ tạo instance KHI có người gọi getInstance() lần đầu; phải synchronized kẻo hai luồng tạo hai bản. Tiết kiệm cho object nặng.", "Khách gọi mới nấu — khỏi phí nếu không ai dùng."],
    "Template Method": ["Pattern Behavioral: định nghĩa KHUNG XƯƠNG thuật toán ở lớp cha (templateMethod gọi các step), HOÃN vài step cho lớp con; con điền chi tiết mà không đổi cấu trúc. Hiện thân của OCP. Nguyên tắc Hollywood: 'Don't call us, we'll call you'.", "Tờ đơn in sẵn: bố cục cố định, bạn chỉ điền vào chỗ trống."],
    "hook": ["Bước TÙY CHỌN trong Template Method mà lớp con CÓ THỂ override hoặc bỏ qua (non-abstract). Vd override paint() khi extends JFrame.", "Bước 'thêm topping?' — muốn thì làm, không thì thôi."],
    "Factory Method": ["Pattern Creational: định nghĩa interface để tạo object nhưng để LỚP CON quyết định lớp cụ thể nào được khởi tạo (Creator.factoryMethod() abstract). Tách CREATION khỏi USAGE → không vi phạm OCP/SRP khi thêm loại.", "Vào tiệm pizza gọi 'một cái Hawaii', không tự vào bếp nhào bột — bếp lo phần tạo."],
    "Simple Factory": ["Gom code tạo object vào MỘT lớp/method (vd SimplePizzaFactory.createPizza(type)) — KHÔNG phải pattern GoF chính thức; vẫn vi phạm OCP khi thêm loại → nâng lên Factory Method.", "Quầy order duy nhất: nói tên món, quầy lo tạo — nhưng thêm món vẫn phải sửa quầy."],
    "Abstract Factory": ["Pattern Creational: 'xưởng tổng' abstract sinh ra CẢ MỘT HỌ (family) sản phẩm ăn khớp nhau; đổi họ chỉ cần đổi ConcreteFactory. Thêm loại sản phẩm mới thì khó (phải sửa xưởng tổng & mọi con).", "Bộ nội thất đồng bộ: chọn 'gói Bắc Âu' ra cả bàn+ghế+tủ cùng tông."],
    "Comparator": ["Đối tượng chứa QUY TẮC so sánh để sắp xếp theo tiêu chí tùy ý (Collections.sort(list, comparator)); tách trách nhiệm 'ordering' khỏi entity (ví dụ SRP). Singleton tốt vì không có state.", "Trọng tài bạn thuê để xếp hạng theo đúng luật bạn muốn."],

    /* ---------- OO chung (xuất hiện xuyên suốt) ---------- */
    "class": ["Lớp — bản THIẾT KẾ/khuôn mô tả một nhóm object có chung properties (attribute), behavior (operation), relationships, semantics.", "Khuôn bánh: từ một khuôn đúc ra nhiều bánh giống nhau."],
    "object": ["Đối tượng — một thực thể cụ thể tạo từ class, có dữ liệu & hành vi riêng; thường passive & persistent (với entity).", "Cái bánh thật đúc ra từ khuôn (class)."],
    "instance": ["Thể hiện — một object cụ thể của một class (instance của association là một link).", "Một bản sao thật làm ra từ khuôn mẫu."],
    "inheritance": ["Kế thừa — lớp con nhận cấu trúc/hành vi của lớp cha rồi bổ sung/override ('is a kind of'). Single/Multiple inheritance.", "Con thừa hưởng nét cha mẹ rồi có cá tính riêng."],
    "abstract class": ["Lớp trừu tượng — chưa hoàn chỉnh, không tạo object trực tiếp, để lớp con hoàn thiện (chứa method abstract).", "Bản thiết kế dở dang — phải có con hoàn thiện mới xây được."],
    "superclass": ["Lớp cha trong quan hệ generalization — chia sẻ cấu trúc/hành vi cho lớp con.", "Đời trước truyền lại đặc điểm."],
    "subclass": ["Lớp con kế thừa từ superclass; phải tuân LSP (thay thế được cha).", "Đời sau nhận đặc điểm rồi thêm nét riêng."],
    "override": ["Lớp con viết LẠI một method của cha theo cách của mình — cơ chế của dynamic polymorphism & hook.", "Con nấu món gia truyền theo khẩu vị riêng."],
    "composition (OO)": ["Kỹ thuật tái sử dụng bằng cách CHỨA object khác (thay vì kế thừa); LSP khuyên dùng composition thay inheritance khi chỉ muốn dùng cài đặt.", "Lắp ghép bộ phận có sẵn, thay vì 'di truyền'."]
  };

  /* Bí danh (surface khác / acronym ↔ đầy đủ) → khóa chuẩn trong G */
  const ALIAS = {
    "software life cycle process": "Software Life Cycle Process",
    "iso 12207": "ISO/IEC 12207",
    "object oriented analysis and design": "OOAD",
    "object-oriented analysis and design": "OOAD",
    "unified modeling language": "Unified Modeling Language",
    "use case model": "Use-Case Model",
    "use-case model": "Use-Case Model",
    "software architecture document": "Software Architecture Document",
    "version control system": "VCS",
    "distributed version control": "Distributed Version Control",
    "change list": "change set",
    "use case": "Use Case",
    "use case specification": "Use-Case Specification",
    "use-case specification": "Use-Case Specification",
    "use case diagram": "Use case diagram",
    "use-case diagram": "Use case diagram",
    "use case realization": "Use-Case Realization",
    "use-case realization": "Use-Case Realization",
    "supplementary spec": "Supplementary Specification",
    "normal flow": "basic flow",
    "graphical user interface": "Graphical User Interface",
    "graphical user interface design": "Graphical User Interface",
    "screen transition diagram": "Screen Transition Diagram",
    "generalization (inheritance)": "Generalization (Inheritance)",
    "entity relationship diagram": "ER diagram",
    "entity-relationship diagram": "ER diagram",
    "e-r diagram": "ER diagram",
    "er model": "ER diagram",
    "e-r model": "ER diagram",
    "data model": "Data Modeling",
    "primary key": "primary key",
    "foreign key": "foreign key",
    "functional dependency": "Functional Dependency",
    "boyce-codd nf": "BCNF",
    "software quality assurance": "QA",
    "quality assurance": "QA",
    "quality assurance (qa)": "QA",
    "v-model": "V-Model",
    "unit test": "Unit",
    "integration test": "Integration",
    "system test": "System",
    "acceptance test": "Acceptance",
    "black box": "Black-box",
    "white box": "White-box",
    "equivalence partitioning": "Equivalence Partitioning",
    "boundary-value analysis": "Boundary-value",
    "boundary value analysis": "Boundary-value",
    "boundary value": "Boundary-value",
    "statement coverage": "C0",
    "branch coverage": "C1",
    "regression testing": "Regression Test",
    "programming style": "coding convention",
    "code smells": "code smell",
    "bad smells": "code smell",
    "keep it simple, stupid": "KISS",
    "don't repeat yourself": "DRY",
    "dont repeat yourself": "DRY",
    "boy scout rule": "Boy Scout Rule",
    "modular design": "Modular design",
    "single responsibility principle": "SRP",
    "open-closed principle": "Open-Closed Principle",
    "open/closed principle": "Open-Closed Principle",
    "open closed principle": "Open-Closed Principle",
    "liskov substitution principle": "Liskov Substitution Principle",
    "interface segregation principle": "Interface Segregation Principle",
    "dependency inversion principle": "Dependency Inversion Principle",
    "dynamic polymorphism": "Dynamic Polymorphism",
    "static polymorphism": "Static Polymorphism",
    "design patterns": "Design Pattern",
    "design pattern": "Design Pattern",
    "gang of four": "Gang of Four",
    "architectural pattern": "Architectural pattern",
    "architectural patterns": "Architectural pattern",
    "model view controller": "MVC",
    "model-view-controller": "MVC",
    "3 tier": "3-tier",
    "three-tier": "3-tier",
    "law of demeter": "Law of Demeter",
    "lod": "Law of Demeter"
  };

  /* ================= ENGINE ================= */
  const main = document.querySelector('main.content');
  if (!main) return;

  const norm = s => s.toLowerCase().replace(/[\s\-]+/g, ' ').trim();

  // Bảng tra: norm(surface) -> khóa chuẩn
  const LOOKUP = Object.create(null);
  Object.keys(G).forEach(k => { LOOKUP[norm(k)] = k; });
  Object.keys(ALIAS).forEach(a => { if (G[ALIAS[a]]) LOOKUP[norm(a)] = ALIAS[a]; });

  // Bề mặt để dựng regex (khóa + bí danh), dài trước ngắn sau (khớp cụm dài trước)
  const surfaces = Object.keys(G).concat(Object.keys(ALIAS))
    .filter(s => G[s] || G[ALIAS[s]])
    .sort((a, b) => b.length - a.length);
  // Escape regex; space & '-' đều khớp [\s-]+ (chấp cả biến thể gạch nối/ xuống dòng)
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[\s\-]+/g, '[\\s\\-]+');
  const RE = new RegExp(
    '(?<![\\p{L}\\p{N}_])(?:' + surfaces.map(escRe).join('|') + ')(?:e?s)?(?![\\p{L}\\p{N}_])',
    'giu'
  );

  function resolve(matched) {
    const n = norm(matched);
    return LOOKUP[n] || LOOKUP[n.replace(/s$/, '')] || LOOKUP[n.replace(/es$/, '')] || null;
  }

  const BAN = new Set(['A', 'CODE', 'PRE', 'KBD', 'SCRIPT', 'STYLE', 'BUTTON', 'TEXTAREA',
    'H1', 'H2', 'H3', 'H4', 'H5']);
  function banned(node) {
    let el = node.parentNode;
    while (el && el !== main) {
      if (el.nodeType === 1) {
        if (BAN.has(el.tagName)) return true;
        const c = el.classList;
        if (c && (c.contains('gloss') || c.contains('no-gloss') || c.contains('who'))) return true;
      }
      el = el.parentNode;
    }
    return false;
  }

  const texts = [];
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (!n.nodeValue || !/\S/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
      if (banned(n)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let tn; while ((tn = walker.nextNode())) texts.push(tn);

  texts.forEach(node => {
    const text = node.nodeValue;
    let m, last = 0, frag = null;
    RE.lastIndex = 0;
    while ((m = RE.exec(text))) {
      const matched = m[0];
      const canon = resolve(matched);
      if (!canon) continue;
      if (!frag) frag = document.createDocumentFragment();
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const span = document.createElement('span');
      span.className = 'gloss';
      span.dataset.k = canon;
      span.textContent = matched;
      frag.appendChild(span);
      last = m.index + matched.length;
    }
    if (frag) {
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    }
  });

  /* ---- Tooltip ---- */
  const tip = document.createElement('div');
  tip.id = 'gloss-tip';
  tip.innerHTML = '<div class="gt-term"></div><div class="gt-w"></div><div class="gt-v"></div>';
  document.body.appendChild(tip);
  const elTerm = tip.querySelector('.gt-term');
  const elW = tip.querySelector('.gt-w');
  const elV = tip.querySelector('.gt-v');
  const escHtml = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  function fill(canon) {
    const e = G[canon]; if (!e) return;
    elTerm.textContent = canon;
    elW.innerHTML = '<b>Là gì:</b> ' + escHtml(e[0]);
    elV.innerHTML = '<b>Dễ hình dung:</b> ' + escHtml(e[1]);
  }
  function place(x, y) {
    const pad = 14, tw = tip.offsetWidth, th = tip.offsetHeight, vw = innerWidth, vh = innerHeight;
    let left = x + pad, top = y + pad;
    if (left + tw > vw - 8) left = x - pad - tw;
    if (left < 8) left = 8;
    if (top + th > vh - 8) top = y - pad - th;
    if (top < 8) top = 8;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }

  let active = null;
  const canHover = !matchMedia || matchMedia('(hover:hover)').matches;

  if (canHover) {
    document.addEventListener('pointerover', e => {
      const g = e.target.closest && e.target.closest('.gloss');
      if (!g || g === active) return;
      active = g; fill(g.dataset.k); tip.classList.add('show'); place(e.clientX, e.clientY);
    });
    document.addEventListener('pointermove', e => { if (active) place(e.clientX, e.clientY); });
    document.addEventListener('pointerout', e => {
      const g = e.target.closest && e.target.closest('.gloss');
      if (!g || g !== active) return;
      const to = e.relatedTarget;
      if (to && to.closest && to.closest('.gloss') === g) return;
      active = null; tip.classList.remove('show');
    });
  } else {
    document.addEventListener('click', e => {
      const g = e.target.closest && e.target.closest('.gloss');
      if (g) {
        if (active === g && tip.classList.contains('show')) { active = null; tip.classList.remove('show'); }
        else {
          active = g; fill(g.dataset.k); tip.classList.add('show');
          const r = g.getBoundingClientRect(); place(r.left + r.width / 2, r.bottom);
        }
        e.stopPropagation();
      } else { active = null; tip.classList.remove('show'); }
    });
  }
  addEventListener('scroll', () => { if (active) { active = null; tip.classList.remove('show'); } }, { passive: true });

  /* ---- Gợi ý lần đầu ---- */
  try {
    if (!localStorage.getItem('itss-gloss-hint')) {
      const hint = document.createElement('div');
      hint.id = 'gloss-hint';
      hint.innerHTML = '<span>💡 Rê chuột vào <u>thuật ngữ gạch chân</u> để xem nó là gì trong hệ thống.</span><button aria-label="Đóng">✕</button>';
      document.body.appendChild(hint);
      const close = () => { hint.remove(); localStorage.setItem('itss-gloss-hint', '1'); };
      hint.querySelector('button').addEventListener('click', close);
      setTimeout(() => hint.classList.add('show'), 400);
      setTimeout(close, 9000);
    }
  } catch (_) { }
})();
